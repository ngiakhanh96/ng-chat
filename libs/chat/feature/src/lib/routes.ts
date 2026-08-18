import { Routes } from '@angular/router';
import { ChatStore } from '@ng-chat/chat-data-access';
import { ChatPageComponent } from './chat-page/chat-page.component';

export const CHAT_ROUTES: Routes = [
  {
    path: '',
    providers: [ChatStore],
    children: [
      {
        path: '',
        pathMatch: 'full',
        component: ChatPageComponent,
      },
      {
        path: 'c/:conversationId',
        component: ChatPageComponent,
      },
    ],
  },
];
