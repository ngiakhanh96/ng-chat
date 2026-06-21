export type ChatMessageRole = 'user' | 'assistant' | 'system';

export type ChatMessageStatus = 'complete' | 'streaming' | 'error';

export interface ChatMessage {
  id: string;
  conversationId: string;
  role: ChatMessageRole;
  content: string;
  createdAt: string;
  status: ChatMessageStatus;
}

export interface ChatConversationSummary {
  id: string;
  title: string;
  updatedAt: string;
  pinned?: boolean;
}

export interface ChatConversation extends ChatConversationSummary {
  messages: ChatMessage[];
}

export interface ChatSidebarSection {
  id: string;
  title: string;
  conversations: ChatConversationSummary[];
}
