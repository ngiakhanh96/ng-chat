import {
  Component,
  computed,
  DestroyRef,
  effect,
  inject,
  input,
  linkedSignal,
  output,
  signal,
  untracked,
} from '@angular/core';
import { IChapterResponse } from '@ng-chat/chat-data-access';
import {
  ChatMessageStatus,
  IChatMessage,
  IChatMessageToolCall,
} from '@ng-chat/shared-data-access';
import { DisplayDatePipe } from '@ng-chat/shared-ui';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

interface IBufferState {
  reasoning: string;
  chapterTitle: string;
  chapterContent: string;
  choices: string[];
}

const EMPTY_BUFFER_STATE: IBufferState = {
  reasoning: '',
  chapterTitle: '',
  chapterContent: '',
  choices: [],
};

const CHARACTERS_PER_TICK = 2;

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
})
export class ChatMessageComponent {
  private readonly destroyRef = inject(DestroyRef);

  message = input.required<IChatMessage<string | IChapterResponse>>();
  choicesDisabled = input(false);
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

  //Buffered text state for typewriter effect
  private readonly textBuffer = signal<IBufferState>(EMPTY_BUFFER_STATE);
  private textCompletedState = EMPTY_BUFFER_STATE;
  private textMessageCreatedAt: string | undefined;
  private typewriterEnabled = false;
  private typingTimer: ReturnType<typeof setInterval> | undefined;

  protected bufferedReasoning = computed(() => this.textBuffer().reasoning);
  protected bufferedChapterTitle = computed(
    () => this.textBuffer().chapterTitle,
  );
  protected bufferedChapterContent = computed(
    () => this.textBuffer().chapterContent,
  );
  protected bufferedChoice(index: number): string {
    return this.textBuffer().choices[index] ?? '';
  }
  protected isChoiceTyping(index: number): boolean {
    return (
      this.bufferedChoice(index) !== this.textCompletedState.choices[index]
    );
  }

  constructor() {
    effect(() => {
      const message = this.message();
      const chapter = this.isChapterResponse(message.content)
        ? message.content
        : undefined;
      const target: IBufferState = {
        reasoning: message.reasoning?.content ?? '',
        chapterTitle: chapter
          ? `Chapter ${chapter.chapterNumber}: ${chapter.chapterName}`
          : '',
        chapterContent: chapter?.content ?? '',
        choices: chapter?.choices.map((choice) => choice.choiceContent) ?? [],
      };

      untracked(() =>
        this.syncTypewriter(message.createdAt, message.status, target),
      );
    });

    this.destroyRef.onDestroy(() => {
      this.clearTypingTimer();
    });
  }

  protected toggleReasoning() {
    this.reasoningExpanded.update((expanded) => !expanded);
  }

  readonly reasoningSummary = computed((): string => {
    const activeToolCall = this.activeToolCall();
    const reasoningText = this.message().reasoning?.content;
    const toolCalls = this.reasoningToolCalls();
    const reasoningDuration = this.reasoningDuration();
    if (activeToolCall) {
      return this.toolCallLabel(activeToolCall);
    }

    if (reasoningText) {
      return `Thought for ${reasoningDuration}`;
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

  protected copyResponse() {
    navigator?.clipboard?.writeText(JSON.stringify(this.message().content));
  }

  private syncTypewriter(
    textMessageCreatedAt: string,
    status: ChatMessageStatus,
    target: IBufferState,
  ) {
    this.textCompletedState = target;

    if (this.textMessageCreatedAt !== textMessageCreatedAt) {
      this.textMessageCreatedAt = textMessageCreatedAt;
      this.typewriterEnabled = status === 'streaming';
      this.clearTypingTimer();
      if (this.typewriterEnabled) {
        this.textBuffer.set(EMPTY_BUFFER_STATE);
      }
    }

    if (!this.typewriterEnabled) {
      this.textBuffer.set(target);
      this.clearTypingTimer();
      return;
    }

    this.startTyping();
  }

  private startTyping() {
    if (this.typingTimer != null) {
      return;
    }

    this.typingTimer = setInterval(() => {
      this.renderNextChunk();
      if (this.isBufferCompleted()) {
        this.clearTypingTimer();
      }
    }, 5);
  }

  private clearTypingTimer() {
    if (this.typingTimer != null) {
      clearInterval(this.typingTimer);
      this.typingTimer = undefined;
    }
  }

  private renderNextChunk() {
    const textBuffer = this.textBuffer();
    if (
      textBuffer.reasoning.length < this.textCompletedState.reasoning.length
    ) {
      this.textBuffer.update((state) => ({
        ...state,
        reasoning: this.appendChunk(
          state.reasoning,
          this.textCompletedState.reasoning,
        ),
      }));
      return;
    }

    if (
      textBuffer.chapterTitle.length <
      this.textCompletedState.chapterTitle.length
    ) {
      this.textBuffer.update((state) => ({
        ...state,
        chapterTitle: this.appendChunk(
          state.chapterTitle,
          this.textCompletedState.chapterTitle,
        ),
      }));
      return;
    }

    if (
      textBuffer.chapterContent.length <
      this.textCompletedState.chapterContent.length
    ) {
      this.textBuffer.update((state) => ({
        ...state,
        chapterContent: this.appendChunk(
          state.chapterContent,
          this.textCompletedState.chapterContent,
        ),
      }));
      return;
    }

    const choiceIndex = this.textCompletedState.choices.findIndex(
      (choice, index) =>
        (textBuffer.choices[index] ?? '').length < choice.length,
    );
    if (choiceIndex >= 0) {
      this.textBuffer.update((state) => ({
        ...state,
        choices: this.textCompletedState.choices.map((choice, index) =>
          index === choiceIndex
            ? this.appendChunk(state.choices[index] ?? '', choice)
            : (state.choices[index] ?? ''),
        ),
      }));
    }
  }

  private appendChunk(displayed: string, target: string): string {
    return target.slice(0, displayed.length + CHARACTERS_PER_TICK);
  }

  private isBufferCompleted(): boolean {
    const textBuffer = this.textBuffer();
    return (
      textBuffer.reasoning === this.textCompletedState.reasoning &&
      textBuffer.chapterTitle === this.textCompletedState.chapterTitle &&
      textBuffer.chapterContent === this.textCompletedState.chapterContent &&
      textBuffer.choices.length === this.textCompletedState.choices.length &&
      textBuffer.choices.every(
        (choice, index) => choice === this.textCompletedState.choices[index],
      )
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
