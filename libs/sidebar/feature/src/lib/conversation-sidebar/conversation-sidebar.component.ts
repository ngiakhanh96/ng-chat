import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { ChatSidebarSection } from '@ng-chat/shared-data-access';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'chat-conversation-sidebar',
  imports: [
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzTooltipModule,
  ],
  templateUrl: './conversation-sidebar.component.html',
  styleUrl: './conversation-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationSidebarComponent {
  sections = input<ChatSidebarSection[]>([]);
  selectedConversationId = input<string | null>(null);
  newConversation = output<void>();
  conversationSelected = output<string>();
}
