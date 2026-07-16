import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
} from '@angular/core';
import { IChapterResponse } from '@ng-chat/chat-data-access';
import { IChatMessage } from '@ng-chat/shared-data-access';
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
  message = input.required<IChatMessage<string | IChapterResponse>>();
  suggestedActionSelected = output<string>();

  isUser = computed(() => this.message().role === 'user');

  protected isChapterResponse(
    content: string | IChapterResponse | undefined,
  ): content is IChapterResponse {
    return (
      typeof content === 'object' &&
      content !== null &&
      typeof content.content === 'string' &&
      Array.isArray(content.choices)
    );
  }

  async copyResponse() {
    await globalThis.navigator?.clipboard?.writeText(
      JSON.stringify(this.message().content),
    );
  }
}
