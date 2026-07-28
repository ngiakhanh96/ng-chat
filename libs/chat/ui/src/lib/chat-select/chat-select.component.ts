import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { FormValueControl } from '@angular/forms/signals';

export interface IChatSelectOption {
  readonly id: string;
  readonly name: string;
}

@Component({
  selector: 'chat-select',
  templateUrl: './chat-select.component.html',
  styleUrl: './chat-select.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChatSelectComponent implements FormValueControl<string> {
  readonly value = model.required<string>();
  readonly label = input.required<string>();
  readonly options = input.required<readonly IChatSelectOption[]>();
  readonly indicator = input(false);

  protected onValueChanged(event: Event) {
    this.value.set((event.target as HTMLSelectElement).value);
  }
}
