import { NgTemplateOutlet } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import {
  ChatConversationSummary,
  ChatMessage,
  ChatSidebarSection,
} from '@ng-chat/chat-data-access';
import { ChatComposerComponent, ChatThreadComponent } from '@ng-chat/chat-ui';
import { ConversationSidebarComponent } from '@ng-chat/sidebar-feature';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'chat-chat-layout',
  imports: [
    ChatComposerComponent,
    ChatThreadComponent,
    ConversationSidebarComponent,
    NgTemplateOutlet,
    NzButtonModule,
    NzDrawerModule,
    NzIconModule,
  ],
  templateUrl: './chat-layout.component.html',
  styleUrl: './chat-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatLayoutComponent {
  sidebarSections = input<ChatSidebarSection[]>([]);
  selectedConversationId = input<string | null>(null);
  activeConversation = input<ChatConversationSummary | undefined>();
  messages = input<ChatMessage[]>([]);
  mobileSidebarOpen = input(false);
  newConversation = output<void>();
  conversationSelected = output<string>();
  mobileSidebarOpened = output<void>();
  mobileSidebarClosed = output<void>();
  messageSubmitted = output<string>();
}
