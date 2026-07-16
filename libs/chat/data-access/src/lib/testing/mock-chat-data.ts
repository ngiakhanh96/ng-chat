export const MOCK_CHAT_CONVERSATIONS = [
  {
    id: 'conversation-architecture',
    title: 'Architecture for AGUI adapters',
    updatedAt: 'Today',
    pinned: true,
    messages: [
      {
        id: 'architecture-1',
        conversationId: 'conversation-architecture',
        role: 'user',
        content:
          'How should we model AGUI and A2UI without coupling the templates to protocol payloads?',
        createdAt: '09:24',
        status: 'complete',
      },
      {
        id: 'architecture-2',
        conversationId: 'conversation-architecture',
        role: 'assistant',
        content:
          'Use protocol adapters in data-access, normalize every event into a canonical chat model, and keep feature components responsible for mapping state into UI view models.',
        createdAt: '09:25',
        status: 'complete',
      },
    ],
  },
  {
    id: 'conversation-ui',
    title: 'Polished chat shell',
    updatedAt: 'Yesterday',
    pinned: true,
    messages: [
      {
        id: 'ui-1',
        conversationId: 'conversation-ui',
        role: 'user',
        content: 'Create a modern chat UI with a sidebar like ChatGPT.',
        createdAt: '18:10',
        status: 'complete',
      },
      {
        id: 'ui-2',
        conversationId: 'conversation-ui',
        role: 'assistant',
        content:
          'Start with a quiet two-column shell, strong focus states, responsive drawer navigation, and a composer that feels stable while messages stream.',
        createdAt: '18:11',
        status: 'complete',
      },
    ],
  },
  {
    id: 'conversation-testing',
    title: 'Testing checklist',
    updatedAt: 'May 29',
    messages: [
      {
        id: 'testing-1',
        conversationId: 'conversation-testing',
        role: 'assistant',
        content:
          'A reliable shell needs component tests for presentation states and an e2e smoke test for the first happy path.',
        createdAt: '13:42',
        status: 'complete',
      },
    ],
  },
];
