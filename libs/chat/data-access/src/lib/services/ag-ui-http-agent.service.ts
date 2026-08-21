import { HttpAgent, HttpAgentConfig } from '@ag-ui/client';
import { inject, Service } from '@angular/core';
import {
  AppSettingsService,
  TestUserHeaderService,
} from '@ng-chat/shared-data-access';
import { Observable } from 'rxjs';
import { IChatHttpRequest } from '../models/http-requests/chat-http-request.model';
import { IChatHttpResponse } from '../models/http-responses/chat-http-response.model';
import { agUiRetryingFetch } from './http/ag-ui-retrying-fetch';

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
      const toolCallMessageIds = new Map<string, string>();

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
            onToolCallStartEvent: ({ event }) => {
              const messageId = event.parentMessageId ?? request.messageId;
              toolCallMessageIds.set(event.toolCallId, messageId);
              observer.next({
                conversationId: agent.threadId,
                messageId,
                event: {
                  type: 'tool-call-start',
                  toolCallId: event.toolCallId,
                  toolName: event.toolCallName,
                  occurredAtMs: Date.now(),
                },
              });
            },
            onToolCallArgsEvent: () => {
              // Tool arguments are intentionally not retained or rendered.
            },
            onToolCallEndEvent: () => {
              // Completion is reported only when the result arrives.
            },
            onToolCallResultEvent: ({ event }) => {
              const messageId =
                toolCallMessageIds.get(event.toolCallId) ?? request.messageId;
              toolCallMessageIds.delete(event.toolCallId);
              observer.next({
                conversationId: agent.threadId,
                messageId,
                event: {
                  type: 'tool-call-complete',
                  toolCallId: event.toolCallId,
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

      return () => {
        if (agent.isRunning) {
          agent.abortRun();
        }
      };
    });
  }

  private create(config: HttpAgentConfig): HttpAgent {
    return new HttpAgent({
      ...config,
      fetch: agUiRetryingFetch,
    });
  }
}
