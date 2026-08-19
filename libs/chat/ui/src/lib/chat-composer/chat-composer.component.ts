import { TextFieldModule } from '@angular/cdk/text-field';
import {
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { FormField, disabled, form } from '@angular/forms/signals';
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
  submitted = output<string>();
  private readonly composerModel = signal({ message: '' });
  protected readonly composerForm = form(this.composerModel, (schemaPath) => {
    disabled(schemaPath.message, () => this.disabled());
  });
  trimmedDraft = computed(() => this.composerForm.message().value().trim());

  canSend = computed(() => {
    return this.trimmedDraft().length > 0 && !this.disabled();
  });

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
