export interface IChatModel {
  readonly id: string;
  readonly name: string;
  readonly efforts: readonly IChatModelEffort[];
  readonly isDefault: boolean;
}

export interface IChatModelEffort {
  readonly id: string;
  readonly name: string;
  readonly isDefault: boolean;
}
