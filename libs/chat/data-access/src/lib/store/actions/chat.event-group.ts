import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { IChatModel } from '../../models/chat.model';
import { IChatHttpResponseEvent } from '../../models/http-responses/chat-http-response.model';
import { IConversationHistoryMessageResponse } from '../../models/http-responses/conversation-history-message-response.model';
import { IConversationSummaryResponse } from '../../models/http-responses/conversation-summary-response.model';
import { IChapterResponse } from '../reducers/chat.reducer';

export const chatEventGroup = eventGroup({
  source: 'Chat',
  events: {
    newConversation: type<void>(),
    setActiveConversationId: type<{ conversationId: string }>(),
    searchQueryChanged: type<{ query: string }>(),
    modelSelected: type<{ modelId: string }>(),
    modelEffortSelected: type<{ effortId: string }>(),
    loadModels: type<void>(),
    modelsLoaded: type<{ models: IChatModel[] }>(),
    loadConversations: type<void>(),
    conversationsLoaded: type<{ sessions: IConversationSummaryResponse[] }>(),
    conversationHistoryLoaded: type<{
      conversationId: string;
      messages: IConversationHistoryMessageResponse[];
    }>(),
    messageSubmitted: type<{
      conversationId: string;
      content: string;
      messageId: string;
      storyTitle: string;
      modelId: string;
      modelEffort: string;
    }>(),
    responseEventReceived: type<{
      conversationId: string;
      messageId: string;
      event: IChatHttpResponseEvent;
    }>(),
    responseCompleted: type<{
      conversationId: string;
      messageId: string;
      response: IChapterResponse;
    }>(),
  },
});
