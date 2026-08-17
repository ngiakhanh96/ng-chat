import { HttpAgent, HttpAgentConfig } from '@ag-ui/client';
import { inject, Service } from '@angular/core';
import {
  AppSettingsService,
  TestUserHeaderService,
} from '@ng-chat/shared-data-access';
import { Observable } from 'rxjs';
import { IChatHttpRequest } from '../models/http-requests/chat-http-request.model';
import { IChatHttpResponse } from '../models/http-responses/chat-http-response.model';

@Service()
export class AgUiHttpAgentService {
  private readonly interactiveStoryConfig =
    inject(AppSettingsService).appConfig()!.interactiveStory!;
  private readonly testUserHeaderService = inject(TestUserHeaderService);

  streamTurn(
    request: IChatHttpRequest,
    url: string,
  ): Observable<IChatHttpResponse> {
    return new Observable<IChatHttpResponse>((observer) => {
      let completedMessage: string | undefined;
      let completedMessageId: string | undefined;

      const agent = this.create({
        url: url,
        threadId: request.threadId,
        headers: this.testUserHeaderService.getHeaders(),
        initialMessages: [
          {
            id: request.messageId,
            role: 'user',
            content: request.content,
          },
        ],
      });

      agent
        .runAgent(
          {
            forwardedProps: {
              storyTitle: request.storyTitle,
              modelId: request.modelId,
              modelEffort: request.modelEffort,
            },
          },
          {
            onReasoningStartEvent: ({ event }) => {
              observer.next({
                conversationId: agent.threadId,
                messageId: event.messageId,
                event: {
                  type: 'reasoning-start',
                  occurredAtMs: Date.now(),
                },
              });
            },
            onReasoningMessageStartEvent: ({ event }) => {
              observer.next({
                conversationId: agent.threadId,
                messageId: event.messageId,
                event: {
                  type: 'reasoning-message-start',
                  occurredAtMs: Date.now(),
                },
              });
            },
            onReasoningMessageContentEvent: ({ event }) => {
              observer.next({
                conversationId: agent.threadId,
                messageId: event.messageId,
                event: {
                  type: 'reasoning-text-delta',
                  delta: event.delta,
                  occurredAtMs: Date.now(),
                },
              });
            },
            onReasoningMessageEndEvent: ({ event }) => {
              observer.next({
                conversationId: agent.threadId,
                messageId: event.messageId,
                event: {
                  type: 'reasoning-message-end',
                  occurredAtMs: Date.now(),
                },
              });
            },
            onReasoningEndEvent: ({ event }) => {
              observer.next({
                conversationId: agent.threadId,
                messageId: event.messageId,
                event: {
                  type: 'reasoning-end',
                  occurredAtMs: Date.now(),
                },
              });
            },
            onTextMessageContentEvent: ({ event }) => {
              observer.next({
                conversationId: agent.threadId,
                messageId: event.messageId,
                event: {
                  type: 'text-delta',
                  delta: event.delta,
                  occurredAtMs: Date.now(),
                },
              });
            },
            onTextMessageEndEvent: ({ event, textMessageBuffer }) => {
              completedMessage = textMessageBuffer;
              completedMessageId = event.messageId;
            },
            onRunErrorEvent: ({ event }) => {
              observer.error(event);
            },
          },
        )
        .then(() => {
          if (completedMessage === undefined) {
            observer.error(
              new Error('The AG-UI run ended without an assistant message.'),
            );
            return;
          }
          observer.next({
            conversationId: agent.threadId,
            messageId: completedMessageId as string,
            event: {
              type: 'response-complete',
              content: completedMessage,
              occurredAtMs: Date.now(),
            },
          });
          observer.complete();
        })
        .catch((error: unknown) => {
          observer.error(error);
        });
    });
  }

  private create(config: HttpAgentConfig): HttpAgent {
    return new HttpAgent(config);
  }
}
