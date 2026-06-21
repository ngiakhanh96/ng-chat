import {
  ChangeDetectionStrategy,
  Component,
  effect,
  input,
  output,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { ChatSidebarSection } from '@ng-chat/shared-data-access';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

@Component({
  selector: 'chat-conversation-sidebar',
  imports: [
    FormField,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzTooltipModule,
  ],
  templateUrl: './conversation-sidebar.component.html',
  styleUrl: './conversation-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConversationSidebarComponent {
  sections = input<ChatSidebarSection[]>([]);
  selectedConversationId = input<string | null>(null);
  newConversation = output<void>();
  conversationSelected = output<string>();
  searchQueryChanged = output<string>();
  private readonly searchModel = signal({ query: '' });
  protected readonly searchForm = form(this.searchModel);

  constructor() {
    effect(() => {
      this.searchQueryChanged.emit(this.searchForm.query().value());
    });
  }
}
