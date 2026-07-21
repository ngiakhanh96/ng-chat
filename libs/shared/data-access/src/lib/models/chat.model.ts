export type ChatMessageRole = 'user' | 'assistant' | 'system';

export type ChatMessageStatus = 'complete' | 'streaming' | 'error';

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
