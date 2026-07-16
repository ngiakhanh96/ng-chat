import { computed } from '@angular/core';

import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { IChatState } from '../reducers/chat.reducer';

export function withChatSelectors<_>() {
  return signalStoreFeature(
    { state: type<IChatState>() },
    withComputed((store) => ({
      activeConversation: computed(() =>
        store
          .conversations()
          .find(
            (conversation) =>
              conversation.id === store.selectedConversationId(),
          ),
      ),
    })),
  );
}
