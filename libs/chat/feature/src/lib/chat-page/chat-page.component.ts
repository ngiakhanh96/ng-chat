import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  linkedSignal,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ChatStore, chatEventGroup } from '@ng-chat/chat-data-access';
import {
  ChatComposerComponent,
  ChatConversationComponent,
} from '@ng-chat/chat-ui';
import {
  BaseWithSandBoxComponent,
  IChatConversationSummary,
} from '@ng-chat/shared-data-access';
import {
  ConversationSidebarComponent,
  IChatSidebarSection,
} from '@ng-chat/sidebar-feature';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'chat-page',
  imports: [
    ChatComposerComponent,
    ChatConversationComponent,
    ConversationSidebarComponent,
    NgTemplateOutlet,
    NzButtonModule,
    NzDrawerModule,
    NzIconModule,
    FormField,
  ],
  templateUrl: './chat-page.component.html',
  styleUrl: './chat-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatPageComponent extends BaseWithSandBoxComponent {
  private readonly chatStore = inject(ChatStore);
  conversations = this.chatStore.conversations;
  activeConversationId = this.chatStore.activeConversationId;
  mobileSidebarOpen = signal(false);
  searchQuery = this.chatStore.searchQuery;
  activeConversation = this.chatStore.activeConversation;

  // Hardcoded models list with associated default effort levels.
  // Default model is ChatGPT 5.6 with effort Medium.
  models = signal([
    { id: 'gpt-5.6-terra', label: 'ChatGPT 5.6 Terra', effort: 'Medium' },
    { id: 'gpt-5.6-sol', label: 'ChatGPT 5.6 Sol', effort: 'Medium' },
    { id: 'opus-5', label: 'Opus 5', effort: 'High' },
    { id: 'opus-4.8', label: 'Opus 4.8', effort: 'Medium' },
  ]);
  selectedModel = linkedSignal(() => this.models()[0]);
  selectedEffort = computed(() => this.selectedModel()?.effort ?? 'Default');

  protected readonly selectedModelForm = form(this.selectedModel);

  constructor() {
    super();
    this.dispatchEvent(chatEventGroup.loadConversations());

    effect(() => {
      const id = this.selectedModelForm.id().value();
      const newSelectedModel = this.models().find((m) => m.id === id);
      if (newSelectedModel) {
        this.selectedModel.set(newSelectedModel);
        console.log(
          `Selected model changed to: ${newSelectedModel.label} with effort ${newSelectedModel.effort}`,
        );
      }
    });
  }

  activeMessages = computed(() => this.activeConversation()?.messages ?? []);

  sidebarSections = computed<IChatSidebarSection[]>(() => {
    const query = this.searchQuery().trim().toLowerCase();
    const summaries = this.conversations().filter(
      (conversation) =>
        !query || conversation.title.toLowerCase().includes(query),
    );

    return [
      {
        id: 'pinned',
        title: 'Pinned',
        conversationSummaries: summaries
          .filter((conversation) => conversation.pinned)
          .sort(this.sortByUpdatedAtDesc),
      },
      {
        id: 'recent',
        title: 'Recent',
        conversationSummaries: summaries
          .filter((conversation) => !conversation.pinned)
          .sort(this.sortByUpdatedAtDesc),
      },
    ].filter((section) => section.conversationSummaries.length > 0);
  });

  onNewConversation() {
    this.dispatchEvent(chatEventGroup.newConversation());
  }

  onConversationIdSelected(
    conversationId: string | undefined,
    closeAfterAction: boolean,
  ) {
    if (conversationId) {
      this.dispatchEvent(
        chatEventGroup.setActiveConversationId({ conversationId }),
      );
    }
    if (closeAfterAction) {
      this.closeMobileSidebar();
    }
  }

  onSearchQueryChanged(query: string) {
    this.dispatchEvent(chatEventGroup.searchQueryChanged({ query }));
  }

  onMessageSubmitted(content: string) {
    let conversationId = this.activeConversationId();
    let storyTitle = this.activeConversation()?.title;
    if (conversationId == null) {
      conversationId = this.createId();
      storyTitle = this.createConversationTitle(content);
      this.dispatchEvent(
        chatEventGroup.setActiveConversationId({ conversationId }),
      );
    }

    this.dispatchEvent(
      chatEventGroup.messageSubmitted({
        conversationId,
        messageId: this.createId(),
        content,
        storyTitle: storyTitle as string,
      }),
    );
  }

  openMobileSidebar() {
    this.mobileSidebarOpen.set(true);
  }

  closeMobileSidebar() {
    this.mobileSidebarOpen.set(false);
  }

  private createId(): string {
    return globalThis.crypto.randomUUID();
  }

  private createConversationTitle(content: string): string {
    return content.length > 46 ? `${content.slice(0, 45)}...` : content;
  }

  private sortByUpdatedAtDesc(
    a: IChatConversationSummary,
    b: IChatConversationSummary,
  ) {
    return b.updatedAt.localeCompare(a.updatedAt);
  }
}
