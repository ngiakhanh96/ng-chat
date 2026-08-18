import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  linkedSignal,
  output,
} from '@angular/core';
import { IChapterResponse } from '@ng-chat/chat-data-access';
import {
  IChatMessage,
  IChatMessageToolCall,
} from '@ng-chat/shared-data-access';
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
  reasoningToolCalls = computed(
    () => this.message().reasoning?.toolCalls ?? [],
  );
  activeToolCall = computed(() =>
    this.reasoningToolCalls().find((toolCall) => toolCall.status === 'running'),
  );
  protected toggleReasoning() {
    this.reasoningExpanded.update((expanded) => !expanded);
  }

  readonly reasoningSummary = computed((): string => {
    const activeToolCall = this.activeToolCall();
    const reasoningText = this.message().reasoning?.content;
    const toolCalls = this.reasoningToolCalls();
    if (activeToolCall) {
      return this.toolCallLabel(activeToolCall);
    }

    if (reasoningText) {
      return `Thought for ${this.reasoningDuration()}`;
    }

    return toolCalls.length === 1
      ? this.toolCallLabel(toolCalls[0])
      : `Used ${toolCalls.length} tools`;
  });

  protected toolCallLabel(toolCall: IChatMessageToolCall): string {
    const toolName = toolCall.toolName.split('_').join(' ');
    switch (toolCall.status) {
      case 'running':
        return `Running ${toolName}…`;
      case 'completed':
        return `Used ${toolName}`;
      case 'failed':
        return `Failed to use ${toolName}`;
    }
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
