import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import {
  ChatConversationSummary,
  ChatMessage,
} from '@ng-chat/shared-data-access';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { ChatMessageComponent } from '../chat-message/chat-message.component';

@Component({
  selector: 'chat-thread',
  imports: [ChatMessageComponent, NzEmptyModule],
  templateUrl: './chat-thread.component.html',
  styleUrl: './chat-thread.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatThreadComponent {
  conversation = input<ChatConversationSummary | undefined>();
  messages = input<ChatMessage[]>([]);
}
