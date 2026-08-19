import {
  Component,
  effect,
  input,
  model,
  output,
  signal,
} from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { IChatConversationSummary } from '@ng-chat/shared-data-access';
import { DisplayDatePipe } from '@ng-chat/shared-ui';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';

export interface IChatSidebarSection {
  id: string;
  title: string;
  conversationSummaries: IChatConversationSummary[];
}

@Component({
  selector: 'chat-conversation-sidebar',
  imports: [
    FormField,
    NzAvatarModule,
    NzButtonModule,
    NzIconModule,
    NzInputModule,
    NzTooltipModule,
    DisplayDatePipe,
  ],
  templateUrl: './conversation-sidebar.component.html',
  styleUrl: './conversation-sidebar.component.scss',
})
export class ConversationSidebarComponent {
  sections = input<IChatSidebarSection[]>([]);
  activeConversationId = model<string | undefined>(undefined);
  newConversation = output<void>();
  searchQueryChange = output<string>();
  private readonly searchModel = signal({ query: '' });
  protected readonly searchForm = form(this.searchModel);

  constructor() {
    effect(() => {
      this.searchQueryChange.emit(this.searchForm.query().value());
    });
  }
}
