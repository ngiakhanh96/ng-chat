import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  input,
  viewChild,
} from '@angular/core';
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
  private readonly endOfMessages =
    viewChild<ElementRef<HTMLElement>>('endOfMessages');

  private readonly scrollToLatestMessage = afterRenderEffect({
    write: () => {
      const messages = this.messages();
      const latestMessageId = messages[messages.length - 1]?.id;
      const endOfMessages = this.endOfMessages();

      if (!latestMessageId || !endOfMessages) {
        return;
      }

      endOfMessages.nativeElement.scrollIntoView({
        block: 'end',
        behavior: 'smooth',
      });
    },
  });
}
