import { TextFieldModule } from '@angular/cdk/text-field';
import {
  afterNextRender,
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  Injector,
  input,
  output,
  signal,
  viewChild,
} from '@angular/core';
import { disabled, form, FormField } from '@angular/forms/signals';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'chat-composer',
  imports: [
    FormField,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzTooltipModule,
    TextFieldModule,
  ],
  templateUrl: './chat-composer.component.html',
  styleUrl: './chat-composer.component.scss',
})
export class ChatComposerComponent {
  placeholder = input('Ask ng-chat');
  disabled = input(false);
  autoFocus = input(false);
  submitted = output<string>();
  private readonly injector = inject(Injector);
  private readonly composerModel = signal({ message: '' });
  private readonly messageInput =
    viewChild<ElementRef<HTMLTextAreaElement>>('messageInput');
  protected readonly composerForm = form(this.composerModel, (schemaPath) => {
    disabled(schemaPath.message, () => this.disabled());
  });
  trimmedDraft = computed(() => this.composerForm.message().value().trim());

  canSend = computed(() => {
    return this.trimmedDraft().length > 0 && !this.disabled();
  });

  constructor() {
    effect(() => {
      if (!this.autoFocus() || this.disabled()) {
        return;
      }

      afterNextRender(() => this.focus(), { injector: this.injector });
    });
  }

  focus() {
    if (!this.disabled()) {
      this.messageInput()?.nativeElement.focus();
    }
  }

  onSubmit(event?: SubmitEvent) {
    event?.preventDefault();
    if (!this.canSend()) {
      return;
    }
    const content = this.trimmedDraft();
    this.submitted.emit(content);
    this.composerForm.message().reset('');
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSubmit();
    }
  }
}
