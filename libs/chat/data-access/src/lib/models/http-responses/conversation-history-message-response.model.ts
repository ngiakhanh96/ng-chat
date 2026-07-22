import { ChatMessageRole } from '@ng-chat/shared-data-access';

export interface IConversationHistoryMessageResponse {
  messageId: string;
  role: ChatMessageRole;
  createdAt: string;
  messageText: string;
}
