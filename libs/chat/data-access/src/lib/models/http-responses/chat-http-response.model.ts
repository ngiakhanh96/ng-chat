export type IChatHttpResponse = {
  conversationId: string;
  messageId: string;
  event: IChatHttpResponseEvent;
};

export type IChatHttpResponseEvent =
  | {
      type: 'text-delta';
      delta: string;
      occurredAtMs: number;
    }
  | {
      type: 'reasoning-start';
      occurredAtMs: number;
    }
  | {
      type: 'reasoning-message-start';
      occurredAtMs: number;
    }
  | {
      type: 'reasoning-text-delta';
      delta: string;
      occurredAtMs: number;
    }
  | {
      type: 'reasoning-message-end';
      occurredAtMs: number;
    }
  | {
      type: 'reasoning-end';
      occurredAtMs: number;
    }
  | {
      type: 'tool-call-start';
      toolCallId: string;
      toolName: string;
      occurredAtMs: number;
    }
  | {
      type: 'tool-call-complete';
      toolCallId: string;
      occurredAtMs: number;
    }
  | {
      type: 'response-complete';
      content: string;
      occurredAtMs: number;
    };
