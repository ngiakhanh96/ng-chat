import { BreakpointObserver } from '@angular/cdk/layout';
import { toSignal } from '@angular/core/rxjs-interop';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  signal,
} from '@angular/core';
import { ChatLayoutComponent } from '@ng-chat/chat-ui';
import {
  ChatConversation,
  ChatConversationSummary,
  ChatMessage,
  ChatSidebarSection,
  MOCK_CHAT_CONVERSATIONS,
} from '@ng-chat/chat-data-access';
import { BaseWithSandBoxComponent } from '@ng-chat/shared-data-access';
import { map } from 'rxjs';

@Component({
  selector: 'chat-page',
  imports: [ChatLayoutComponent],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent extends BaseWithSandBoxComponent {
  private breakpointObserver = inject(BreakpointObserver);
  conversations = signal<ChatConversation[]>(MOCK_CHAT_CONVERSATIONS);
  selectedConversationId = signal(MOCK_CHAT_CONVERSATIONS[0]?.id ?? null);
  mobileSidebarOpen = signal(false);
  isMobile = toSignal(
    this.breakpointObserver
      .observe('(max-width: 900px)')
      .pipe(map((result) => result.matches)),
    { initialValue: false },
  );

  activeConversation = computed(() =>
    this.conversations().find(
      (conversation) => conversation.id === this.selectedConversationId(),
    ),
  );

  activeConversationSummary = computed(() => {
    const activeConversation = this.activeConversation();
    if (!activeConversation) {
      return undefined;
    }
    return this.toConversationSummary(activeConversation);
  });

  activeMessages = computed(() => this.activeConversation()?.messages ?? []);

  sidebarSections = computed<ChatSidebarSection[]>(() => {
    const summaries = this.conversations().map((conversation) =>
      this.toConversationSummary(conversation),
    );
    return [
      {
        id: 'pinned',
        title: 'Pinned',
        conversations: summaries.filter((conversation) => conversation.pinned),
      },
      {
        id: 'recent',
        title: 'Recent',
        conversations: summaries.filter((conversation) => !conversation.pinned),
      },
    ].filter((section) => section.conversations.length > 0);
  });

  onNewConversation() {
    const id = `conversation-${Date.now()}`;
    const conversation: ChatConversation = {
      id,
      title: 'New chat',
      preview: 'Start a fresh conversation.',
      updatedAt: 'Now',
      messages: [],
    };
    this.conversations.update((conversations) => [
      conversation,
      ...conversations,
    ]);
    this.selectedConversationId.set(id);
  }

  onConversationSelected(conversationId: string) {
    this.selectedConversationId.set(conversationId);
  }

  onMessageSubmitted(content: string) {
    const activeConversation = this.activeConversation();
    if (!activeConversation) {
      this.onNewConversation();
    }
    const conversationId = this.selectedConversationId();
    if (!conversationId) {
      return;
    }

    const now = this.formatNow();
    const userMessage: ChatMessage = {
      id: `message-user-${Date.now()}`,
      conversationId,
      role: 'user',
      content,
      createdAt: now,
      status: 'complete',
    };
    const assistantMessage: ChatMessage = {
      id: `message-assistant-${Date.now()}`,
      conversationId,
      role: 'assistant',
      content:
        'Mock response: the UI shell is wired. Next we can connect this flow to a chat data-access store and protocol adapters.',
      createdAt: now,
      status: 'complete',
    };

    this.conversations.update((conversations) =>
      conversations.map((conversation) =>
        conversation.id === conversationId
          ? {
              ...conversation,
              title:
                conversation.messages.length === 0
                  ? this.createTitle(content)
                  : conversation.title,
              preview: content,
              updatedAt: 'Now',
              messages: [
                ...conversation.messages,
                userMessage,
                assistantMessage,
              ],
            }
          : conversation,
      ),
    );
  }

  openMobileSidebar() {
    this.mobileSidebarOpen.set(true);
  }

  closeMobileSidebar() {
    this.mobileSidebarOpen.set(false);
  }

  private createTitle(content: string) {
    return content.length > 48 ? `${content.slice(0, 45)}...` : content;
  }

  private formatNow() {
    return new Intl.DateTimeFormat('en', {
      hour: '2-digit',
      minute: '2-digit',
    }).format(new Date());
  }

  private toConversationSummary(
    conversation: ChatConversation,
  ): ChatConversationSummary {
    return {
      id: conversation.id,
      title: conversation.title,
      preview: conversation.preview,
      updatedAt: conversation.updatedAt,
      pinned: conversation.pinned,
    };
  }
}
