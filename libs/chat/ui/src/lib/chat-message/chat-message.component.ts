import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { ChatMessage } from '@ng-chat/chat-data-access';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'chat-message',
  imports: [NzAvatarModule, NzButtonModule, NzIconModule, NzTooltipModule],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
  message = input.required<ChatMessage>();

  get isUser() {
    return this.message().role === 'user';
  }
}
