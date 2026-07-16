export type IChatHttpResponse = {
  conversationId: string;
  messageId: string;
  event: IChatHttpResponseEvent;
};

export type IChatHttpResponseEvent =
  | {
      type: 'text-delta';
      delta: string;
    }
  | {
      type: 'message-complete';
      content: string;
    };
