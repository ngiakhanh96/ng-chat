import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { IChatConversation, IChatMessage } from '@ng-chat/shared-data-access';
import {
  signalStore,
  signalStoreFeature,
  type,
  withState,
} from '@ngrx/signals';
import { on, withReducer } from '@ngrx/signals/events';
import { IConversationHistoryMessageResponse } from '../../models/http-responses/conversation-history-message-response.model';
import { chatEventGroup } from '../actions/chat.event-group';
import { withChatEffects } from '../effects/chat.effects';
import { withChatSelectors } from '../selectors/chat.selectors';

export interface IChatState {
  conversations: IChatConversation<IChapterResponse | string>[];
  activeConversationId: string | undefined;
  searchQuery: string;
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
      on(chatEventGroup.conversationsLoaded, ({ payload }, state) => {
        const sessionConversations = payload.sessions.map((session) =>
          newConversation(session.sessionDbKey, session.storyTitle, []),
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
        const userMessage: IChatMessage<string> = {
          id: payload.messageId,
          role: 'user',
          content: payload.content,
          createdAt: new Date().toISOString(),
          status: 'complete',
        };
        return {
          conversations: addMessagesToConversation(
            payload.conversationId,
            state.conversations,
            [userMessage],
            payload.storyTitle,
          ),
        };
      }),
      on(chatEventGroup.responseCompleted, ({ payload }, state) => {
        const assistantMessage: IChatMessage<IChapterResponse> = {
          id: payload.messageId,
          role: 'assistant',
          content: payload.response,
          createdAt: new Date().toISOString(),
          status: 'complete',
        };

        return {
          conversations: addMessagesToConversation(
            payload.conversationId,
            state.conversations,
            [assistantMessage],
          ),
        };
      }),
    ),
  );
}

function newConversation(
  conversationId: string,
  title: string | undefined,
  messages: IChatMessage<IChapterResponse | string>[],
): IChatConversation<IChapterResponse | string> {
  const dateNow = new Date().toISOString();
  return {
    id: conversationId,
    title: title ?? '',
    createdAt: dateNow,
    updatedAt: dateNow,
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
        ? messageResponse.messageText
        : parseChapterResponse(messageResponse.messageText),
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
    conversation = updateConversation(conversation, messages);
  }

  return conversations.map((c) =>
    c.id === conversationId ? conversation! : c,
  );
}

function updateConversation(
  conversation: IChatConversation<IChapterResponse | string>,
  messages: IChatMessage<IChapterResponse | string>[],
): IChatConversation<IChapterResponse | string> {
  return {
    ...conversation,
    updatedAt: new Date().toISOString(),
    messages: [...conversation.messages, ...messages],
  };
}
