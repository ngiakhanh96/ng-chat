import { TextFieldModule } from '@angular/cdk/text-field';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  input,
  output,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'chat-composer',
  imports: [
    FormsModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzTooltipModule,
    TextFieldModule,
  ],
  templateUrl: './chat-composer.component.html',
  styleUrl: './chat-composer.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatComposerComponent {
  placeholder = input('Ask ng-chat');
  disabled = input(false);
  submitted = output<string>();
  draft = signal('');

  canSend = computed(() => {
    return this.draft().trim().length > 0 && !this.disabled();
  });

  onSubmit(event?: SubmitEvent) {
    event?.preventDefault();
    const content = this.draft().trim();
    if (!content || this.disabled()) {
      return;
    }
    this.submitted.emit(content);
    this.draft.set('');
  }

  onKeydown(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.onSubmit();
    }
  }
}
