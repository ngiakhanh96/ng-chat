import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { IChapterResponse } from '@ng-chat/chat-data-access';
import { IChatMessage } from '@ng-chat/shared-data-access';
import { DisplayDatePipe } from '@ng-chat/shared-ui';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'chat-message',
  imports: [
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzTooltipModule,
    DisplayDatePipe,
  ],
  templateUrl: './chat-message.component.html',
  styleUrl: './chat-message.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatMessageComponent {
  message = input.required<IChatMessage<string | IChapterResponse>>();
  suggestedActionSelected = output<string>();

  isUser = computed(() => this.message().role === 'user');
  reasoningExpanded = linkedSignal(() => this.message().status === 'streaming');
  reasoningPanelId = computed(() => `reasoning-${this.message().id}`);
  reasoningDuration = computed(() =>
    this.formatReasoningDuration(this.message().reasoning?.elapsedMs ?? 0),
  );

  protected toggleReasoning() {
    this.reasoningExpanded.update((expanded) => !expanded);
  }

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

  copyResponse() {
    globalThis.navigator?.clipboard?.writeText(
      JSON.stringify(this.message().content),
    );
  }

  private formatReasoningDuration(elapsedMs: number): string {
    if (elapsedMs < 1_000) {
      return 'less than a second';
    }

    const totalSeconds = Math.round(elapsedMs / 1_000);
    if (totalSeconds < 60) {
      return `${totalSeconds} second${totalSeconds === 1 ? '' : 's'}`;
    }

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return seconds === 0 ? `${minutes}m` : `${minutes}m ${seconds}s`;
  }
}
