import { Routes, UrlMatcher } from '@angular/router';
import { ChatStore } from '@ng-chat/chat-data-access';
import { ChatPageComponent } from './chat-page/chat-page.component';

const chatPageMatcher: UrlMatcher = (segments) => {
  if (segments.length === 0) {
    return { consumed: [] };
  }

  if (segments.length === 2 && segments[0].path === 'c') {
    return {
      consumed: segments,
      posParams: { conversationId: segments[1] },
    };
  }

  return null;
};

export const CHAT_ROUTES: Routes = [
  {
    matcher: chatPageMatcher,
    providers: [ChatStore],
    component: ChatPageComponent,
  },
];
