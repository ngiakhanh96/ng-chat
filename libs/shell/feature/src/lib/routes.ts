import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const SHELL_ROUTES: Routes = [
  {
    path: '',
    component: LayoutComponent,
    providers: [],
    children: [
      {
        path: '',
        loadChildren: () =>
          import('@ng-chat/chat-feature').then((m) => m.CHAT_ROUTES),
      },
    ],
  },
];
