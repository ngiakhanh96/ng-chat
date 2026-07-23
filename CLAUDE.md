<!-- nx configuration start-->
<!-- Leave the start & end comments to automatically receive updates. -->

# General Guidelines for working with Nx

- For navigating/exploring the workspace, invoke the `nx-workspace` skill first - it has patterns for querying projects, targets, and dependencies
- When running tasks (for example build, lint, test, e2e, etc.), always prefer running the task through `nx` (i.e. `nx run`, `nx run-many`, `nx affected`) instead of using the underlying tooling directly
- Prefix nx commands with the workspace's package manager (e.g., `pnpm nx build`, `npm exec nx test`) - avoids using globally installed CLI
- You have access to the Nx MCP server and its tools, use them to help the user
- For Nx plugin best practices, check `node_modules/@nx/<plugin>/PLUGIN.md`. Not all plugins have this file - proceed without it if unavailable.
- NEVER guess CLI flags - always check nx_docs or `--help` first when unsure

## Scaffolding & Generators

- For scaffolding tasks (creating apps, libs, project structure, setup), ALWAYS invoke the `nx-generate` skill FIRST before exploring or calling MCP tools

## When to use nx_docs

- USE for: advanced config options, unfamiliar flags, migration guides, plugin configuration, edge cases
- DON'T USE for: basic generator syntax (`nx g @nx/react:app`), standard commands, things you already know
- The `nx-generate` skill handles generator discovery internally - don't call nx_docs just to look up generator syntax

<!-- nx configuration end-->

# Repo Standards

## Product Direction

This repo builds an Angular chat UI in the spirit of ChatGPT: fast, accessible, streaming-friendly, and ready to integrate multiple agent/UI protocols such as AGUI, A2UI, and future protocol variants. Keep the UI protocol-agnostic. Protocol details belong in adapters and data-access services; components should consume a stable internal chat model.

## Workspace Shape

- Package manager: npm. Run Nx through `npm exec nx ...`.
- Default app: `ng-chat`.
- Main app: `app/ng-chat`.
- E2E app: `app/ng-chat-e2e`.
- Keep feature domains under `libs/`, mirroring the architecture from `C:\Users\khanh\Desktop\angular-youtube` while using this repo's physical layout.
- New domains should be split into sibling Nx libraries:
  - `libs/<domain>/feature`: smart/container components, routes, orchestration, and sandbox interaction.
  - `libs/<domain>/ui`: dumb/presentational components that receive data through inputs and emit events through outputs.
  - `libs/<domain>/data-access`: domain event groups, effects, reducers, selectors, stores, models, HTTP/protocol clients, and adapters.
- Existing shared libraries:
  - `libs/shared/data-access`: `BaseWithSandBoxComponent`, shared sandbox/store primitives, shared auth/storage/HTTP context utilities, and cross-domain models.
  - `libs/shared/ui`: reusable presentational UI, directives, pipes, utilities, and UI-only services.
- Build output currently lands in `docs/`. Treat `docs/`, `dist/`, `.angular/`, `.nx/`, and `tmp/` as generated/cache output unless the task is explicitly about deployment artifacts.

## Architecture Boundaries

- Preserve Nx module boundaries in `eslint.config.mjs`. Do not bypass them with relative deep imports.
- Import libraries through their public entry points. Current examples:
  - `@ng-chat/shared-data-access`
  - `@ng-chat/shared-ui`
  - `@ng-chat/shell-feature`
- `app/ng-chat` composes providers, routing, SSR/CSR entry points, global interceptors, and app-level configuration. Keep product features in domain feature libraries.
- Feature libraries are smart. Components in `libs/<domain>/feature` may inject domain stores/services, read sandbox/shared store state, dispatch events, coordinate routing, and map store/protocol/domain data into UI view models.
- Feature components should extend `BaseWithSandBoxComponent` when they dispatch sandbox events or read sandbox/shared store state.
- UI libraries are dumb/presentational. Components in `libs/<domain>/ui` should take data with Angular `input()` and report user intent with `output()`.
- UI components should not dispatch sandbox events and should not inject domain stores or data-access services.
- Data-access libraries own domain state and side effects. Put domain actions/event groups, effects, reducers, selectors, signal stores, models, HTTP clients, protocol clients, and adapters in `libs/<domain>/data-access`.
- Dependency rules should mirror the angular-youtube layering:
  - `<domain>-feature` may depend on same-domain `ui`, same-domain `data-access`, `shared-ui`, and `shared-data-access`.
  - `<domain>-ui` may depend on `shared-ui`, `shared-data-access` for shared types only when needed, and same-domain `data-access` only for stable domain view-model types.
  - `<domain>-data-access` may depend on `shared-data-access`.
  - `shared-data-access` should not depend on local feature or UI libraries.
- `libs/shared/data-access` owns shared primitives only; do not put every domain store or protocol adapter there.
- `libs/shared/ui` owns reusable UI building blocks only; keep domain protocol parsing out of UI components.
- For new large areas, prefer focused Nx libraries with tags that extend the existing `scope:*` pattern instead of growing one catch-all library.

## Chat And Protocol Modeling

- Define one canonical internal chat model for conversations, turns, messages, parts, attachments, tool calls, citations, status, and streaming deltas.
- Keep AGUI, A2UI, OpenAI-style, or other wire formats as external protocol models. Map them into and out of the canonical model with named adapters in the relevant domain `data-access` library.
- Smart feature components consume canonical state/view models and pass protocol-agnostic inputs to dumb UI components.
- Do not let Angular templates, layout components, or shared UI utilities depend directly on protocol-specific payload shapes.
- Model streaming as typed incremental events or deltas. Avoid pushing raw text chunks through unrelated UI state.
- Keep transport concerns separate from state concerns:
  - protocol DTOs and adapters in domain data-access protocol folders,
  - HTTP/WebSocket/SSE clients in domain data-access services,
  - normalized chat state in domain signal stores,
  - rendering in domain feature/UI libraries.
- Treat protocol adapters as compatibility boundaries. Add focused tests with representative fixtures whenever adding or changing a protocol mapping.
- Avoid storing secrets or provider credentials in source. New protocol endpoints, client IDs, and feature flags should come from app settings or deployment configuration.

## Angular Standards

- Prefer standalone components and provider functions. Keep module-era patterns out of new code unless required by a dependency.
- Use `ChangeDetectionStrategy.OnPush` for components. This app uses zoneless change detection, so keep state changes explicit and signal-friendly.
- Prefer `inject()` for dependencies to match the current codebase.
- Prefer Angular signals, `computed`, and NgRx Signals stores for UI/domain state. Use RxJS for async boundaries, HTTP, event streams, cancellation, and interop.
- Use `takeUntilDestroyed`, `DestroyRef`, or signal-store lifecycles for subscriptions. Do not leave manual subscriptions unmanaged.
- Prefer functional guards and functional HTTP interceptors.
- Be SSR-aware. Do not access `window`, `document`, `localStorage`, or browser-only APIs directly from shared code; hide them behind services or platform checks.
- Keep components thin: inputs, outputs, view state, and rendering. Move auth, protocol, persistence, and network behavior into services/stores.
- Avoid `any` in new code. If a protocol payload is unknown, use `unknown` at the edge, validate/narrow it, then map it to typed models.

## State, HTTP, And Auth

- Continue the existing NgRx Signals event/effect/reducer/selector style for shared request state.
- Keep event names grouped by domain source. Use explicit success/error/cancel events for request flows.
- Use the existing `AUTHORIZED` `HttpContextToken` pattern when adding authenticated requests.
- Keep retry behavior intentional. The global HTTP retry interceptor is broad; new non-idempotent calls should opt out or be handled carefully if retry semantics matter.
- Do not add new hard-coded OAuth IDs, API keys, model deployment names, or protocol server URLs. Prefer `app-settings.json` or injected configuration.

## UI And UX Standards

- Build the actual chat surface, not a marketing page, when adding product UI.
- Use Angular Material/CDK and existing SCSS/Tailwind setup consistently.
- Prefer Tailwind syntax in component styles wherever a direct utility exists. Use `@apply` for layout, spacing, sizing, typography, borders, display, flex/grid alignment, overflow, positioning, and common states before writing normal CSS declarations.
- Keep normal CSS for values Tailwind does not express cleanly, such as CSS custom properties, theme-token assignments, complex gradients, `color-mix()`, custom `box-shadow` recipes, pseudo-element artwork, and exact grid templates.
- Chat interactions should support keyboard-first use, visible focus states, loading/streaming states, cancellation, retry, copy actions, and error recovery.
- Message rendering should be resilient to long words, code blocks, tables, streamed partial content, attachments, and tool-call/status rows.
- Keep shared UI components reusable and visually quiet. Product-specific copy and protocol semantics belong in feature components.
- Accessibility is required for new controls: semantic buttons/inputs, labels, ARIA only when needed, focus management for dialogs/menus, and no color-only status indicators.

## Testing And Verification

- Use Nx targets instead of invoking underlying tools directly.
- Useful commands:
  - `npm exec nx run ng-chat:serve`
  - `npm exec nx run ng-chat:build`
  - `npm exec nx run ng-chat:build-csr`
  - `npm exec nx run ng-chat:lint`
  - `npm exec nx run ng-chat:test`
  - `npm exec nx run ng-chat:typecheck`
  - `npm exec nx run ng-chat-e2e:e2e`
  - `npm exec nx affected -t lint,test,typecheck,build`
- Ignore unit tests for now.
- Before finishing broad changes, run the smallest relevant Nx verification target and report anything not run.

## Code Style

- Follow `.editorconfig`: UTF-8, 2-space indentation, final newline, trim trailing whitespace.
- Follow Prettier config: single quotes.
- Keep files focused and public exports intentional. Update `src/index.ts` only when a symbol should be part of a library API.
- Prefer clear names over comments. Add comments only for non-obvious protocol behavior, SSR constraints, or complex state transitions.
- Keep generated or mechanical churn out of unrelated files.

## Recommended Agent Skills

- `nx-workspace`: use first when exploring projects, targets, dependencies, or workspace architecture.
- `nx-generate`: use first for scaffolding apps, libraries, components, or project structure.
- `nx-run-tasks`: use when running build, test, lint, e2e, serve, or affected targets.
- `link-workspace-packages`: use when adding imports between workspace packages or fixing local package resolution.
- `nx-plugins`: use before adding framework/tooling support through Nx plugins.
- `monitor-ci`: use when watching Nx Cloud CI or handling self-healing CI fixes.
- `openai-docs`: use for current OpenAI API, model, and ChatGPT/Codex product guidance if this chat UI integrates OpenAI features.
- Suggested future custom skills, if this repo repeats the work often:
  - `chat-protocol-adapter`: standards and test fixtures for AGUI/A2UI/canonical chat model mapping.
  - `angular-chat-ui`: UX checklist for streaming messages, composer behavior, keyboard interaction, and accessibility.
  - `agent-transport-debugging`: SSE/WebSocket/tool-call tracing patterns for protocol integrations.

<!-- gitnexus:start -->
# GitNexus — Code Intelligence

This project is indexed by GitNexus as **ng-chat** (740 symbols, 1355 relationships, 18 execution flows). Use the GitNexus MCP tools to understand code, assess impact, and navigate safely.

> Index stale? Run `node .gitnexus/run.cjs analyze` from the project root — it auto-selects an available runner. No `.gitnexus/run.cjs` yet? `npx gitnexus analyze` (npm 11 crash → `npm i -g gitnexus`; #1939).

## Always Do

- **MUST run impact analysis before editing any symbol.** Before modifying a function, class, or method, run `impact({target: "symbolName", direction: "upstream"})` and report the blast radius (direct callers, affected processes, risk level) to the user.
- **MUST run `detect_changes()` before committing** to verify your changes only affect expected symbols and execution flows. For regression review, compare against the default branch: `detect_changes({scope: "compare", base_ref: "main"})`.
- **MUST warn the user** if impact analysis returns HIGH or CRITICAL risk before proceeding with edits.
- When exploring unfamiliar code, use `query({search_query: "concept"})` to find execution flows instead of grepping. It returns process-grouped results ranked by relevance.
- When you need full context on a specific symbol — callers, callees, which execution flows it participates in — use `context({name: "symbolName"})`.
- For security review, `explain({target: "fileOrSymbol"})` lists taint findings (source→sink flows; needs `analyze --pdg`).

## Never Do

- NEVER edit a function, class, or method without first running `impact` on it.
- NEVER ignore HIGH or CRITICAL risk warnings from impact analysis.
- NEVER rename symbols with find-and-replace — use `rename` which understands the call graph.
- NEVER commit changes without running `detect_changes()` to check affected scope.

## Resources

| Resource | Use for |
|----------|---------|
| `gitnexus://repo/ng-chat/context` | Codebase overview, check index freshness |
| `gitnexus://repo/ng-chat/clusters` | All functional areas |
| `gitnexus://repo/ng-chat/processes` | All execution flows |
| `gitnexus://repo/ng-chat/process/{name}` | Step-by-step execution trace |

## CLI

| Task | Read this skill file |
|------|---------------------|
| Understand architecture / "How does X work?" | `.claude/skills/gitnexus/gitnexus-exploring/SKILL.md` |
| Blast radius / "What breaks if I change X?" | `.claude/skills/gitnexus/gitnexus-impact-analysis/SKILL.md` |
| Trace bugs / "Why is X failing?" | `.claude/skills/gitnexus/gitnexus-debugging/SKILL.md` |
| Rename / extract / split / refactor | `.claude/skills/gitnexus/gitnexus-refactoring/SKILL.md` |
| Tools, resources, schema reference | `.claude/skills/gitnexus/gitnexus-guide/SKILL.md` |
| Index, status, clean, wiki CLI commands | `.claude/skills/gitnexus/gitnexus-cli/SKILL.md` |

<!-- gitnexus:end -->
