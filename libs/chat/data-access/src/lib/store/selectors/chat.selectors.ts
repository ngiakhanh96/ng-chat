import { computed } from '@angular/core';

import { signalStoreFeature, type, withComputed } from '@ngrx/signals';
import { IChatState } from '../reducers/chat.reducer';

export function withChatSelectors<_>() {
  return signalStoreFeature(
    { state: type<IChatState>() },
    withComputed((store) => {
      const selectedModel = computed(
        () => {
          const availableModels = store.availableModels();
          return (
            availableModels.find(
              (model) => model.id === store.selectedModelId(),
            ) ??
            availableModels.find((model) => model.isDefault) ??
            availableModels[0]
          );
        },
      );
      const selectedModelEfforts = computed(
        () => selectedModel()?.efforts ?? [],
      );
      const selectedModelEffort = computed(
        () =>
          selectedModelEfforts().find(
            (effort) => store.selectedModelEffortId() === effort.id,
          ) ??
          selectedModelEfforts().find((effort) => effort.isDefault) ??
          selectedModelEfforts()[0],
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
