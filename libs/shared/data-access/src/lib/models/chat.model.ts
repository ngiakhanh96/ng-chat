export type ChatMessageRole = 'user' | 'assistant' | 'system';

export type ChatMessageStatus = 'completed' | 'streaming' | 'error';

export type ChatMessageReasoningStatus = 'streaming' | 'completed';

export interface IChatMessageReasoning {
  status: ChatMessageReasoningStatus;
  content: string;
  elapsedMs: number;
  startedAtMs?: number;
}

export interface IChatUserChoice {
  choiceType: string;
  choiceContent: string;
}

export interface IChatMessage<T> {
  id: string;
  role: ChatMessageRole;
  content?: T;
  createdAt: string;
  status: ChatMessageStatus;
  reasoning?: IChatMessageReasoning;
}

export interface IChatConversationSummary {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  pinned?: boolean;
}

export interface IChatConversation<T> extends IChatConversationSummary {
  messages: IChatMessage<T>[];
}
