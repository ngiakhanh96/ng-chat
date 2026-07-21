import { type } from '@ngrx/signals';
import { eventGroup } from '@ngrx/signals/events';
import { IChatHttpResponseEvent } from '../../models/http-responses/chat-http-response.model';
import { IChapterResponse } from '../reducers/chat.reducer';

export const chatEventGroup = eventGroup({
  source: 'Chat',
  events: {
    newConversation: type<void>(),
    setActiveConversationId: type<{ conversationId: string }>(),
    searchQueryChanged: type<{ query: string }>(),
    messageSubmitted: type<{
      conversationId: string;
      content: string;
      messageId: string;
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
