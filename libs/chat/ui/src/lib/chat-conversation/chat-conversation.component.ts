import {
  afterRenderEffect,
  ChangeDetectionStrategy,
  Component,
  computed,
  ElementRef,
  input,
  output,
  viewChild,
} from '@angular/core';
import { IChapterResponse } from '@ng-chat/chat-data-access';
import { IChatConversation } from '@ng-chat/shared-data-access';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { ChatMessageComponent } from '../chat-message/chat-message.component';

@Component({
  selector: 'chat-conversation',
  imports: [ChatMessageComponent, NzEmptyModule],
  templateUrl: './chat-conversation.component.html',
  styleUrl: './chat-conversation.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatConversationComponent {
  conversation = input<
    IChatConversation<string | IChapterResponse> | undefined
  >();
  actionsDisabled = input(false);
  suggestedActionSelected = output<string>();

  messages = computed(() => this.conversation()?.messages ?? []);
  private readonly endOfMessages =
    viewChild<ElementRef<HTMLElement>>('endOfMessages');

  constructor() {
    afterRenderEffect({
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
}
