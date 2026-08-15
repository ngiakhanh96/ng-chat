import { inject } from '@angular/core';
import { createHttpEffectAndUpdateResponse } from '@ng-chat/shared-data-access';
import { signalStoreFeature, type } from '@ngrx/signals';
import { Events, withEventHandlers } from '@ngrx/signals/events';
import { EMPTY, map } from 'rxjs';
import { ChatHttpClientService } from '../../services/http/chat-http.service';
import { chatEventGroup } from '../actions/chat.event-group';
import { IChatState } from '../reducers/chat.reducer';

export function withChatEffects() {
  return signalStoreFeature(
    { state: type<IChatState>() },
    withEventHandlers(
      (
        store,
        events = inject(Events),
        chatHttpClient = inject(ChatHttpClientService),
      ) => ({
        loadModels$: createHttpEffectAndUpdateResponse(
          events,
          chatEventGroup.loadModels,
          () => {
            return chatHttpClient
              .getModels()
              .pipe(map((models) => chatEventGroup.modelsLoaded({ models })));
          },
          false,
        ),
        loadConversations$: createHttpEffectAndUpdateResponse(
          events,
          chatEventGroup.loadConversations,
          () => {
            return chatHttpClient
              .getConversations()
              .pipe(
                map((sessions) =>
                  chatEventGroup.conversationsLoaded({ sessions }),
                ),
              );
          },
          false,
        ),
        loadConversationHistory$: createHttpEffectAndUpdateResponse(
          events,
          chatEventGroup.setActiveConversationId,
          ({ payload }) => {
            const conversation = store
              .conversations()
              .find(
                (conversation) => conversation.id === payload.conversationId,
              );
            if ((conversation?.messages.length ?? 0) > 0) {
              return EMPTY;
            }

            return chatHttpClient
              .getConversationHistory(payload.conversationId)
              .pipe(
                map((messages) =>
                  chatEventGroup.conversationHistoryLoaded({
                    conversationId: payload.conversationId,
                    messages,
                  }),
                ),
              );
          },
          false,
        ),
        submitMessage$: createHttpEffectAndUpdateResponse(
          events,
          chatEventGroup.messageSubmitted,
          ({ payload }) => {
            return chatHttpClient
              .chat({
                threadId: payload.conversationId,
                messageId: payload.messageId,
                content: payload.content,
                storyTitle: payload.storyTitle,
                modelId: payload.modelId,
                modelEffort: payload.modelEffort,
              })
              .pipe(
                map((response) => {
                  if (response.event.type === 'message-complete') {
                    return chatEventGroup.responseCompleted({
                      conversationId: response.conversationId!,
                      messageId: response.messageId,
                      textMessage: response.event.content,
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
