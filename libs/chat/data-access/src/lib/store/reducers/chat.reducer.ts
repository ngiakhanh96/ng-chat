import { withDevtools } from '@angular-architects/ngrx-toolkit';
import {
  IChatConversation,
  IChatMessage,
  IChatMessageReasoning,
} from '@ng-chat/shared-data-access';
import {
  signalStore,
  signalStoreFeature,
  type,
  withState,
} from '@ngrx/signals';
import { on, withReducer } from '@ngrx/signals/events';
import { IChatModel } from '../../models/chat.model';
import { IConversationHistoryMessageResponse } from '../../models/http-responses/conversation-history-message-response.model';
import { chatEventGroup } from '../actions/chat.event-group';
import { withChatEffects } from '../effects/chat.effects';
import { withChatSelectors } from '../selectors/chat.selectors';

export interface IChatState {
  conversations: IChatConversation<IChapterResponse | string>[];
  activeConversationId: string | undefined;
  searchQuery: string;
  availableModels: IChatModel[];
  selectedModelId: string | undefined;
  selectedModelEffortId: string | undefined;
}

export interface IChapterResponse {
  chapterNumber: number;
  chapterName: string;
  content: string;
  choices: IUserChoice[];
}

export interface IUserChoice {
  choiceType: string;
  choiceContent: string;
}

const initialState: IChatState = {
  conversations: [],
  activeConversationId: undefined,
  searchQuery: '',
  availableModels: [],
  selectedModelId: undefined,
  selectedModelEffortId: undefined,
};

export const ChatStore = signalStore(
  withState<IChatState>(initialState),
  withChatReducer(),
  withChatEffects(),
  withChatSelectors(),
  withDevtools('chat'),
);

function withChatReducer() {
  return signalStoreFeature(
    { state: type<IChatState>() },
    withReducer(
      on(chatEventGroup.newConversation, (state) => ({
        activeConversationId: undefined,
      })),
      on(chatEventGroup.setActiveConversationId, ({ payload }) => ({
        activeConversationId: payload.conversationId,
      })),
      on(chatEventGroup.searchQueryChanged, ({ payload }) => ({
        searchQuery: payload.query,
      })),
      on(chatEventGroup.modelsLoaded, ({ payload }) => {
        const selectedModel =
          payload.models.find((model) => model.isDefault) ?? payload.models[0];
        const selectedEffort =
          selectedModel?.efforts.find((effort) => effort.isDefault) ??
          selectedModel?.efforts[0];

        return {
          availableModels: payload.models,
          selectedModelId: selectedModel?.id,
          selectedModelEffortId: selectedEffort?.id,
        };
      }),
      on(chatEventGroup.modelSelected, ({ payload }, state) => {
        const selectedModel = state.availableModels.find(
          (model) => model.id === payload.modelId,
        );
        const selectedEffort =
          selectedModel?.efforts.find((effort) => effort.isDefault) ??
          selectedModel?.efforts[0];

        return selectedModel && selectedEffort
          ? {
              selectedModelId: selectedModel.id,
              selectedModelEffortId: selectedEffort.id,
            }
          : {};
      }),
      on(chatEventGroup.modelEffortSelected, ({ payload }, state) => {
        const selectedModel = state.availableModels.find(
          (model) => model.id === state.selectedModelId,
        );
        const selectedEffort = selectedModel?.efforts.find(
          (effort) => effort.id === payload.effortId,
        );

        return selectedEffort
          ? { selectedModelEffortId: selectedEffort.id }
          : {};
      }),
      on(chatEventGroup.conversationsLoaded, ({ payload }, state) => {
        const sessionConversations = payload.sessions.map((session) =>
          newConversation(
            session.sessionDbKey,
            session.storyTitle,
            [],
            new Date(session.createdAt),
            new Date(session.updatedAt),
          ),
        );
        return {
          conversations: [...sessionConversations],
        };
      }),
      on(chatEventGroup.conversationHistoryLoaded, ({ payload }, state) => {
        const conversation = state.conversations.find(
          (conversation) => conversation.id === payload.conversationId,
        );
        if (!conversation || conversation.messages.length > 0) {
          return {};
        }

        const messages = payload.messages
          .map((message) => mapHistoryMessage(message))
          .filter(
            (message): message is IChatMessage<IChapterResponse | string> =>
              message !== undefined,
          );

        return {
          conversations: state.conversations.map((conversation) =>
            conversation.id === payload.conversationId
              ? updateConversation(conversation, messages)
              : conversation,
          ),
        };
      }),
      on(chatEventGroup.messageSubmitted, ({ payload }, state) => {
        const occurredAtMs = Date.now();
        const userMessage: IChatMessage<string> = {
          id: payload.messageId,
          role: 'user',
          content: payload.content,
          createdAt: new Date(occurredAtMs).toISOString(),
          status: 'complete',
        };
        return {
          conversations: addMessagesToConversation(
            payload.conversationId,
            markStreamingAssistantMessagesFailed(
              payload.conversationId,
              state.conversations,
              occurredAtMs,
            ),
            [userMessage],
            payload.storyTitle,
          ),
        };
      }),
      on(chatEventGroup.responseEventReceived, ({ payload }, state) => {
        const { event } = payload;

        switch (event.type) {
          case 'reasoning-start':
            return {
              conversations: upsertStreamingAssistantMessage(
                payload.conversationId,
                payload.messageId,
                state.conversations,
                event.occurredAtMs,
                (message) => ({
                  ...message,
                  reasoning: startReasoning(
                    message.reasoning,
                    event.occurredAtMs,
                  ),
                }),
              ),
            };
          case 'reasoning-message-start': {
            return {
              conversations: upsertStreamingAssistantMessage(
                payload.conversationId,
                payload.messageId,
                state.conversations,
                event.occurredAtMs,
                (message) => ({
                  ...message,
                  reasoning: startReasoningMessage(
                    message.reasoning,
                    event.occurredAtMs,
                  ),
                }),
              ),
            };
          }
          case 'reasoning-text-delta': {
            return {
              conversations: upsertStreamingAssistantMessage(
                payload.conversationId,
                payload.messageId,
                state.conversations,
                event.occurredAtMs,
                (message) => ({
                  ...message,
                  reasoning: appendReasoningText(
                    message.reasoning,
                    event.delta,
                    event.occurredAtMs,
                  ),
                }),
              ),
            };
          }
          case 'reasoning-end':
            return {
              conversations: upsertStreamingAssistantMessage(
                payload.conversationId,
                payload.messageId,
                state.conversations,
                event.occurredAtMs,
                (message) => ({
                  ...message,
                  reasoning: completeReasoning(
                    message.reasoning,
                    event.occurredAtMs,
                  ),
                }),
              ),
            };
          case 'text-delta':
            return {
              conversations: upsertStreamingAssistantMessage(
                payload.conversationId,
                payload.messageId,
                state.conversations,
                event.occurredAtMs,
                (message) => message,
              ),
            };
          default:
            return {};
        }
      }),
      on(chatEventGroup.responseCompleted, ({ payload }, state) => {
        return {
          conversations: completeAssistantMessage(
            payload.conversationId,
            payload.messageId,
            parseChapterResponse(payload.textMessage),
            state.conversations,
            payload.occurredAtMs,
          ),
        };
      }),
      on(chatEventGroup.responseFailed, ({ payload }, state) => ({
        conversations: markStreamingAssistantMessagesFailed(
          payload.conversationId,
          state.conversations,
          payload.occurredAtMs,
        ),
      })),
    ),
  );
}

function newConversation(
  conversationId: string,
  title: string | undefined,
  messages: IChatMessage<IChapterResponse | string>[],
  createdAt?: Date,
  updatedAt?: Date,
): IChatConversation<IChapterResponse | string> {
  const dateNow = new Date().toISOString();
  return {
    id: conversationId,
    title: title ?? '',
    createdAt: createdAt == null ? dateNow : createdAt.toISOString(),
    updatedAt: updatedAt == null ? dateNow : updatedAt.toISOString(),
    messages: [...messages],
  };
}

function mapHistoryMessage(
  messageResponse: IConversationHistoryMessageResponse,
) {
  const message: IChatMessage<IChapterResponse | string> = {
    id: messageResponse.messageId,
    role: messageResponse.role,
    createdAt: messageResponse.createdAt,
    content:
      messageResponse.role === 'user'
        ? messageResponse.textMessage
        : parseChapterResponse(messageResponse.textMessage),
    status: 'complete' as const,
  };

  return message;
}

function parseChapterResponse(content: string): IChapterResponse | string {
  try {
    return JSON.parse(content) as IChapterResponse;
  } catch {
    return content;
  }
}

function addMessagesToConversation(
  conversationId: string,
  conversations: IChatConversation<IChapterResponse | string>[],
  messages: IChatMessage<IChapterResponse | string>[],
  title?: string,
) {
  conversations = [...conversations];
  let conversation = conversations.find(
    (conversation) => conversation.id === conversationId,
  );

  if (!conversation) {
    conversation = newConversation(conversationId, title, messages);
    conversations.push(conversation);
  } else {
    conversation = updateConversation(conversation, messages, new Date());
  }

  return conversations.map((c) =>
    c.id === conversationId ? conversation! : c,
  );
}

function upsertStreamingAssistantMessage(
  conversationId: string,
  messageId: string,
  conversations: IChatConversation<IChapterResponse | string>[],
  occurredAtMs: number,
  updateFn: (
    message: IChatMessage<IChapterResponse | string>,
  ) => IChatMessage<IChapterResponse | string>,
) {
  const conversation = conversations.find(
    (conversation) => conversation.id === conversationId,
  );

  const currentMessages = conversation!.messages;
  const messageIndex = findLastStreamingAssistantMessageIndex(
    currentMessages,
    messageId,
  );
  let messages: IChatMessage<IChapterResponse | string>[];

  if (messageIndex < 0) {
    const newAssistantMessage: IChatMessage<IChapterResponse | string> = {
      id: messageId,
      role: 'assistant',
      createdAt: new Date(occurredAtMs).toISOString(),
      status: 'streaming',
    };
    messages = [...currentMessages, updateFn(newAssistantMessage)];
  } else {
    messages = updateStreamingAssistantMessages(
      currentMessages,
      updateFn,
      messageIndex,
    );
  }

  return conversations.map((currentConversation) =>
    currentConversation.id === conversationId
      ? {
          ...currentConversation,
          updatedAt: new Date(occurredAtMs).toISOString(),
          messages,
        }
      : currentConversation,
  );
}

function completeAssistantMessage(
  conversationId: string,
  messageId: string,
  content: IChapterResponse | string,
  conversations: IChatConversation<IChapterResponse | string>[],
  occurredAtMs: number,
) {
  const conversation = conversations.find(
    (conversation) => conversation.id === conversationId,
  );
  const messages = [...conversation!.messages];
  const messageIndex = findLastStreamingAssistantMessageIndex(messages);

  if (messageIndex < 0) {
    messages.push({
      id: messageId,
      role: 'assistant',
      content,
      createdAt: new Date(occurredAtMs).toISOString(),
      status: 'complete',
    });
  } else {
    messages[messageIndex] = {
      ...messages[messageIndex],
      id: messageId,
      content,
      status: 'complete',
    };
  }

  return conversations.map((currentConversation) =>
    currentConversation.id === conversationId
      ? {
          ...currentConversation,
          updatedAt: new Date(occurredAtMs).toISOString(),
          messages,
        }
      : currentConversation,
  );
}

function markStreamingAssistantMessagesFailed(
  conversationId: string,
  conversations: IChatConversation<IChapterResponse | string>[],
  occurredAtMs: number,
) {
  return conversations.map((conversation) =>
    conversation.id === conversationId
      ? {
          ...conversation,
          messages: updateStreamingAssistantMessages(
            conversation.messages,
            (message) => ({
              ...message,
              status: 'error',
              reasoning: message.reasoning
                ? completeReasoning(message.reasoning, occurredAtMs)
                : undefined,
            }),
          ),
        }
      : conversation,
  );
}

function updateStreamingAssistantMessages(
  messages: IChatMessage<IChapterResponse | string>[],
  updateFn: (
    message: IChatMessage<IChapterResponse | string>,
  ) => IChatMessage<IChapterResponse | string>,
  messageIndex?: number,
) {
  return messages.map((message, index) =>
    message.role === 'assistant' &&
    message.status === 'streaming' &&
    (messageIndex === undefined || index === messageIndex)
      ? updateFn(message)
      : message,
  );
}

function findLastStreamingAssistantMessageIndex(
  messages: IChatMessage<IChapterResponse | string>[],
  messageId?: string,
) {
  const matchingMessageIndex = messageId
    ? messages.findIndex(
        (message) =>
          message.role === 'assistant' &&
          message.status === 'streaming' &&
          message.id === messageId,
      )
    : -1;
  if (matchingMessageIndex >= 0) {
    return matchingMessageIndex;
  }

  for (let index = messages.length - 1; index >= 0; index--) {
    const message = messages[index];
    if (message.role === 'assistant' && message.status === 'streaming') {
      return index;
    }
  }

  return -1;
}

function startReasoning(
  reasoning: IChatMessageReasoning | undefined,
  occurredAtMs: number,
): IChatMessageReasoning {
  return {
    status: 'streaming',
    content: reasoning?.content ?? '',
    elapsedMs: reasoning?.elapsedMs ?? 0,
    startedAtMs: reasoning?.startedAtMs ?? occurredAtMs,
  };
}

function startReasoningMessage(
  reasoning: IChatMessageReasoning | undefined,
  occurredAtMs: number,
): IChatMessageReasoning {
  const currentReasoning = startReasoning(reasoning, occurredAtMs);
  const separator =
    currentReasoning.content.length > 0 &&
    !currentReasoning.content.endsWith('\n\n')
      ? '\n\n'
      : '';

  return {
    ...currentReasoning,
    content: `${currentReasoning.content}${separator}`,
  };
}

function appendReasoningText(
  reasoning: IChatMessageReasoning | undefined,
  delta: string,
  occurredAtMs: number,
): IChatMessageReasoning {
  const currentReasoning = startReasoning(reasoning, occurredAtMs);
  return {
    ...currentReasoning,
    content: `${currentReasoning.content}${delta}`,
  };
}

function completeReasoning(
  reasoning: IChatMessageReasoning | undefined,
  occurredAtMs: number,
): IChatMessageReasoning {
  const currentReasoning = reasoning ?? {
    status: 'streaming',
    content: '',
    elapsedMs: 0,
    startedAtMs: occurredAtMs,
  };
  const activeElapsedMs = currentReasoning.startedAtMs
    ? Math.max(0, occurredAtMs - currentReasoning.startedAtMs)
    : 0;

  return {
    status: 'complete',
    content: currentReasoning.content,
    elapsedMs: currentReasoning.elapsedMs + activeElapsedMs,
  };
}

function updateConversation(
  conversation: IChatConversation<IChapterResponse | string>,
  messages: IChatMessage<IChapterResponse | string>[],
  newUpdatedAt?: Date,
): IChatConversation<IChapterResponse | string> {
  return {
    ...conversation,
    updatedAt: newUpdatedAt?.toISOString() ?? conversation.updatedAt,
    messages: [...conversation.messages, ...messages],
  };
}
