import { inject } from '@angular/core';
import { createHttpEffectAndUpdateResponse } from '@ng-chat/shared-data-access';
import { signalStoreFeature, type } from '@ngrx/signals';
import { Events, withEventHandlers } from '@ngrx/signals/events';
import { map } from 'rxjs';
import { ChatHttpClientService } from '../../services/http/chat-http.service';
import { chatEventGroup } from '../actions/chat.event-group';
import { IChapterResponse, IChatState } from '../reducers/chat.reducer';

export function withChatEffects() {
  return signalStoreFeature(
    { state: type<IChatState>() },
    withEventHandlers(
      (
        store,
        events = inject(Events),
        chatHttpClient = inject(ChatHttpClientService),
      ) => ({
        submitMessage$: createHttpEffectAndUpdateResponse(
          events,
          chatEventGroup.messageSubmitted,
          ({ payload }) => {
            return chatHttpClient
              .chat({
                threadId: payload.conversationId,
                messageId: payload.messageId,
                content: payload.content,
              })
              .pipe(
                map((response) => {
                  if (response.event.type === 'message-complete') {
                    return chatEventGroup.responseCompleted({
                      conversationId: response.conversationId!,
                      messageId: response.messageId,
                      response: JSON.parse(
                        response.event.content,
                      ) as IChapterResponse,
                    });
                  }

                  return chatEventGroup.responseEventReceived({
                    conversationId: response.conversationId!,
                    messageId: response.messageId,
                    event: response.event,
                  });
                }),
              );
          },
          false,
        ),
      }),
    ),
  );
}
