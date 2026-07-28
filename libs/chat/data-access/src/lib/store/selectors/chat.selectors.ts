import { computed } from '@angular/core';

import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import {
  DEFAULT_CHAT_MODEL,
  DEFAULT_CHAT_MODEL_EFFORT,
} from '../../models/chat.model';
import { IChatState } from '../reducers/chat.reducer';

export function withChatSelectors<_>() {
  return signalStoreFeature(
    { state: type<IChatState>() },
    withComputed((store) => {
      const selectedModel = computed(
        () =>
          store
            .availableModels()
            .find((model) => model.id === store.selectedModelId()) ??
          DEFAULT_CHAT_MODEL,
      );
      const selectedModelEfforts = computed(() => selectedModel().efforts);
      const selectedModelEffort = computed(
        () =>
          selectedModelEfforts().find(
            (effort) => store.selectedModelEffortId() === effort.id,
          ) ?? DEFAULT_CHAT_MODEL_EFFORT,
      );
      return {
        activeConversation: computed(() =>
          store
            .conversations()
            .find(
              (conversation) =>
                conversation.id === store.activeConversationId(),
            ),
        ),
        selectedModel,
        selectedModelEfforts,
        selectedModelEffort,
      };
    }),
  );
}
