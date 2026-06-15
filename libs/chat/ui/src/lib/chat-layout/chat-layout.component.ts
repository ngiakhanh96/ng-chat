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
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { ChatComposerComponent } from '../chat-composer/chat-composer.component';
import { ChatThreadComponent } from '../chat-thread/chat-thread.component';
import { ConversationSidebarComponent } from '../conversation-sidebar/conversation-sidebar.component';

@Component({
  selector: 'chat-chat-layout',
  imports: [
    ChatComposerComponent,
    ChatThreadComponent,
    ConversationSidebarComponent,
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
