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
  ChatSelectComponent,
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
    ChatSelectComponent,
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
  models = this.chatStore.availableModels;
  selectedModel = this.chatStore.selectedModel;
  modelEfforts = this.chatStore.selectedModelEfforts;
  selectedModelEffortId = this.chatStore.selectedModelEffortId;
  selectedModelEffort = this.chatStore.selectedModelEffort;
  private readonly selectedModelFormModel = linkedSignal(() => ({
    id: this.selectedModel().id,
  }));
  private readonly selectedModelEffortFormModel = linkedSignal(() => ({
    id: this.selectedModelEffortId(),
  }));
  protected readonly selectedModelForm = form(this.selectedModelFormModel);
  protected readonly selectedModelEffortForm = form(
    this.selectedModelEffortFormModel,
  );

  constructor() {
    super();
    this.dispatchEvent(chatEventGroup.loadConversations());

    effect(() => {
      const modelId = this.selectedModelForm.id().value();
      if (modelId !== this.chatStore.selectedModelId()) {
        this.dispatchEvent(chatEventGroup.modelSelected({ modelId }));
      }
    });

    effect(() => {
      const effortId = this.selectedModelEffortForm.id().value();
      if (effortId !== this.chatStore.selectedModelEffortId()) {
        this.dispatchEvent(chatEventGroup.modelEffortSelected({ effortId }));
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
    const selectedModel = this.selectedModel();
    const selectedModelEffort = this.selectedModelEffort();
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
        modelId: selectedModel.id,
        modelEffort: selectedModelEffort.name,
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
