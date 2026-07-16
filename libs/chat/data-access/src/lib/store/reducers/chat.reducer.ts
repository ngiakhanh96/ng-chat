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
  selectedConversationId: string | undefined;
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
  selectedConversationId: undefined,
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
        selectedConversationId: undefined,
      })),
      on(chatEventGroup.conversationIdSelected, ({ payload }) => ({
        selectedConversationId: payload.conversationId,
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
          selectedConversationId: payload.conversationId,
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

function newConversation(): IChatConversation<IChapterResponse | string> {
  return {
    id: undefined,
    title: '',
    updatedAt: new Date().toISOString(),
    messages: [],
  };
}

function addMessagesToConversation(
  conversationId: string | undefined,
  conversations: IChatConversation<IChapterResponse | string>[],
  messages: IChatMessage<IChapterResponse | string>[],
) {
  const currentConversations = [...conversations];
  let conversation = currentConversations.find(
    (conversation) => conversation.id === conversationId,
  );
  if (!conversation) {
    conversation = newConversation();
    currentConversations.push(conversation);
  }
  if (conversation.id == null) {
    conversation.title = createConversationTitle(
      (messages[0].content as string) ?? '',
    );
  }
  conversation.messages = [...conversation.messages, ...messages];
  return currentConversations;
}

function createConversationTitle(content: string) {
  return content.length > 46 ? `${content.slice(0, 45)}...` : content;
}
