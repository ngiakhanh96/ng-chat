export interface RetryPolicy {
  readonly maxRetries: number;
  readonly baseDelayMs: number;
  readonly maxDelayMs: number;
}

export const DEFAULT_RETRY_POLICY: RetryPolicy = {
  maxRetries: 3,
  baseDelayMs: 400,
  maxDelayMs: 5_000,
};

export function getRetryDelayMs(
  retryIndex: number,
  policy: RetryPolicy,
  serverRetryAfter: string | null = null,
): number {
  const retryAfterDelay = parseRetryAfterMs(serverRetryAfter);
  if (retryAfterDelay !== undefined) {
    return Math.min(retryAfterDelay, policy.maxDelayMs);
  }

  const exponentialDelay = Math.min(
    policy.maxDelayMs,
    policy.baseDelayMs * 2 ** Math.max(0, retryIndex - 1),
  );

  return Math.floor(Math.random() * (exponentialDelay + 1));
}

function parseRetryAfterMs(
  retryAfter: string | null,
  now = Date.now(),
): number | undefined {
  if (retryAfter === null || retryAfter.trim() === '') {
    return undefined;
  }

  const seconds = Number(retryAfter);
  if (Number.isFinite(seconds) && seconds >= 0) {
    return seconds * 1_000;
  }

  const retryAt = Date.parse(retryAfter);
  return Number.isNaN(retryAt) ? undefined : Math.max(0, retryAt - now);
}
