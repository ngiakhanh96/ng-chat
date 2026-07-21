import { withDevtools } from '@angular-architects/ngrx-toolkit';
import { IChatConversation, IChatMessage } from '@ng-chat/shared-data-access';
import {
  signalStore,
  signalStoreFeature,
  type,
  withState,
} from '@ngrx/signals';
import { on, withReducer } from '@ngrx/signals/events';
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
  messages: IChatMessage<IChapterResponse | string>[],
): IChatConversation<IChapterResponse | string> {
  const firstTextMessage = messages[0] as IChatMessage<string>;
  const dateNow = new Date().toISOString();
  return {
    id: conversationId,
    title: createConversationTitle(firstTextMessage.content ?? ''),
    createdAt: dateNow,
    updatedAt: dateNow,
    messages: [...messages],
  };
}

function addMessagesToConversation(
  conversationId: string,
  conversations: IChatConversation<IChapterResponse | string>[],
  messages: IChatMessage<IChapterResponse | string>[],
) {
  conversations = [...conversations];
  let conversation = conversations.find(
    (conversation) => conversation.id === conversationId,
  );

  if (!conversation) {
    conversation = newConversation(conversationId, messages);
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

function createConversationTitle(content: string) {
  return content.length > 46 ? `${content.slice(0, 45)}...` : content;
}
