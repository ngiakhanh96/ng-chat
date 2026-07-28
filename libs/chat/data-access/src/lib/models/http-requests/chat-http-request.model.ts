export interface IChatHttpRequest {
  threadId?: string;
  messageId: string;
  content: string;
  storyTitle: string;
  modelId: string;
  modelEffort: string;
}
