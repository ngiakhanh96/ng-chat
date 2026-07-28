export interface IChatModel {
  readonly id: string;
  readonly name: string;
  readonly efforts: IChatModelEffort[];
  readonly isDefault: boolean;
}

export interface IChatModelEffort {
  readonly id: string;
  readonly name: string;
}

export const CHAT_MODELS = [
  {
    id: 'gpt-5-nano',
    name: 'ChatGPT 5 Nano',
    efforts: [
      { id: 'medium', name: 'Medium' },
      { id: 'high', name: 'High' },
    ],
    isDefault: true,
  },
  {
    id: 'gpt-5.6-sol',
    name: 'ChatGPT 5.6 Sol',
    efforts: [{ id: 'high', name: 'High' }],
    isDefault: false,
  },
  {
    id: 'opus-5',
    name: 'Opus 5',
    efforts: [{ id: 'low', name: 'Low' }],
    isDefault: false,
  },
  {
    id: 'opus-4.8',
    name: 'Opus 4.8',
    efforts: [{ id: 'medium', name: 'Medium' }],
    isDefault: false,
  },
] as const satisfies IChatModel[];

export const DEFAULT_CHAT_MODEL =
  CHAT_MODELS.find((model) => model.isDefault) ?? CHAT_MODELS[0];

export const DEFAULT_CHAT_MODEL_EFFORT = DEFAULT_CHAT_MODEL.efforts[0];
