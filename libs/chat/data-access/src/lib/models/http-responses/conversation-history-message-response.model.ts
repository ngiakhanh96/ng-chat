import { ChatMessageRole } from '@ng-chat/shared-data-access';

export interface IConversationHistoryMessageResponse {
  messageId: string;
  role: ChatMessageRole;
  createdAt: string;
  textMessage: string;
  reasoningText?: string | null;
  reasoningElapsedMs?: number | null;
}
