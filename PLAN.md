# ChatGPT-Style Chat UI Shell With Sidebar

## Summary

Build a polished v1 chat UI shell only: sidebar, conversation list, main chat viewport, message rendering, composer, responsive mobile sidebar, and mock conversations. No real protocol, network, or persistent chat state yet.

Use **NG-ZORRO + Angular CDK + custom Tailwind/SCSS**. Keep `@angular/cdk`, add `ng-zorro-antd`, and remove `@angular/material` once the current Material usages are replaced. Recommendation: NG-ZORRO is the best third-party fit because its official docs show Angular `^21.0.0` support, SSR support, zoneless/OnPush support, many polished components, icons, and theme customization. Taiga UI is also strong, but NG-ZORRO has clearer Angular 21 alignment for this repo. PrimeNG is broad, but its official docs were not readable in this research pass.

Sources: [NG-ZORRO introduction](https://ng.ant.design/docs/introduce/en), [NG-ZORRO getting started](https://ng.ant.design/docs/getting-started/en), [NG-ZORRO icons](https://ng.ant.design/components/icon/en), [NG-ZORRO theme customization](https://ng.ant.design/docs/customize-theme/en), [Taiga UI GitHub](https://github.com/taiga-family/taiga-ui), [PrimeNG GitHub](https://github.com/primefaces/primeng).

## Key Changes

- Add NG-ZORRO as the UI library:
  - Install `ng-zorro-antd`.
  - Add NG-ZORRO stylesheet to global styles alongside Tailwind.
  - Register only required icons with `provideNzIcons` in `app.config.ts`.

- Remove Angular Material from the planned stack:
  - Keep `@angular/cdk` for behavior primitives.
  - Remove `@angular/material` from `package.json` after replacing active imports.
  - Do not add new Angular Material components for v1 chat UI.

- Scaffold the chat domain under the repo architecture:
  - `libs/chat/data-access`: shared v1 chat view-model types and mock seed data only.
  - `libs/chat/ui`: dumb/presentational chat components.
  - `libs/chat/feature`: smart `ChatPageComponent` that owns local mock selection state and passes data into UI components.

- Use these UI components:
  - NG-ZORRO: `Button`, `Icon`, `Tooltip`, `Dropdown`, `Avatar`, `Input`, `Skeleton`, `Empty`, `Drawer`.
  - Angular CDK: textarea autosize, scrollable areas, overlay/focus behavior, breakpoint detection, focus helpers.
  - Custom SCSS/Tailwind: actual chat layout, sidebar, message list, composer surface, spacing, hover states, responsive rules.

- Clean up current Angular Material usages:
  - Replace `MatSidenavModule` in `libs/shell/feature/src/lib/layout/layout.component.ts` with custom desktop layout plus NG-ZORRO `Drawer` for mobile sidebar behavior.
  - Remove `MAT_RIPPLE_GLOBAL_OPTIONS` and `MATERIAL_ANIMATIONS` providers from `app/ng-chat/src/app/app.config.ts`; NG-ZORRO controls provide their own interaction and animation behavior.
  - Remove the commented `MatIconRegistry` guidance in `app.config.ts`; register required NG-ZORRO icons through `provideNzIcons` instead.

- Build dumb UI components in `libs/chat/ui`:
  - `ChatLayoutComponent`: desktop two-column layout and mobile drawer slot.
  - `ConversationSidebarComponent`: new chat button, search, pinned/recent conversations, user footer.
  - `ChatThreadComponent`: scrollable message timeline and empty state.
  - `ChatMessageComponent`: user/assistant message rows, copy/retry placeholder actions.
  - `ChatComposerComponent`: autosizing textarea, attach placeholder, send button, disabled/empty states.

- Build smart feature behavior in `libs/chat/feature`:
  - `ChatPageComponent extends BaseWithSandBoxComponent`.
  - Local Angular signals for selected conversation, sidebar open state, composer draft, and mock messages.
  - Event handlers for selecting a conversation, starting a new chat, typing, sending a mock message, and opening/closing mobile sidebar.
  - Export `CHAT_ROUTES` and load it from `shell-feature`.

- Update project wiring:
  - Add path aliases for `@ng-chat/chat-data-access`, `@ng-chat/chat-ui`, and `@ng-chat/chat-feature`.
  - Add Nx module-boundary tags and constraints for `scope:chat-feature`, `scope:chat-ui`, and `scope:chat-data-access`.
  - Keep `app/ng-chat` as composition only and keep rendering in the chat domain.

## Public APIs And Types

- Add stable v1 types in `chat-data-access`:
  - `ChatConversationSummary`
  - `ChatMessage`
  - `ChatMessageRole = 'user' | 'assistant' | 'system'`
  - `ChatMessageStatus = 'complete' | 'streaming' | 'error'`
  - `ChatSidebarSection`
- Export only these types and mock seed data from `chat-data-access`.
- Export only reusable dumb UI components from `chat-ui`.
- Export only `CHAT_ROUTES` from `chat-feature`.

## Test Plan

- Unit/component tests:
  - Sidebar renders pinned/recent sections and emits selected conversation.
  - Composer disables send for empty input and emits non-empty submit.
  - Message component renders user and assistant variants.
  - Chat page updates selected conversation and appends a mock user message.

- E2E tests:
  - Desktop shows sidebar and chat viewport.
  - Mobile hides sidebar behind drawer/menu button.
  - User can select a mock conversation.
  - User can type and send a mock message.
  - Keyboard focus reaches composer and send button.

- Verification commands:
  - `rg "@angular/material|MatSidenavModule|MAT_RIPPLE_GLOBAL_OPTIONS|MATERIAL_ANIMATIONS|MatIconRegistry" app libs package.json`
  - `npm exec nx -- run chat-data-access:typecheck`
  - `npm exec nx -- run chat-ui:typecheck`
  - `npm exec nx -- run chat-feature:typecheck`
  - `npm exec nx -- run ng-chat:build-csr`
  - `npm exec nx -- run ng-chat:lint`
  - `npm exec nx -- run ng-chat-e2e:e2e`

## Assumptions

- V1 is a polished UI shell with mock data only.
- Light theme ships first, using CSS custom properties so dark mode can be added later without rewriting components.
- The layout should feel ChatGPT-like but not copy exact proprietary UI details.
- NG-ZORRO is used for polished controls; the main chat surface remains custom for a modern AI-chat feel.
- Angular Material is removed after equivalent NG-ZORRO/CDK replacements are implemented.
