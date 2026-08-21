import type { HttpAgentFetchFn } from '@ag-ui/client';
import {
  DEFAULT_RETRY_POLICY,
  getRetryDelayMs,
} from '@ng-chat/shared-data-access';

const SAFE_RETRY_STATUSES = new Set([408, 425, 429]);

export const agUiRetryingFetch: HttpAgentFetchFn = async (url, requestInit) => {
  let retryIndex = 0;

  while (true) {
    const response = await fetch(url, requestInit);
    if (
      retryIndex >= DEFAULT_RETRY_POLICY.maxRetries ||
      !isSafeToRetry(response)
    ) {
      return response;
    }

    retryIndex += 1;
    const delayMs = getRetryDelayMs(
      retryIndex,
      DEFAULT_RETRY_POLICY,
      response.headers.get('Retry-After'),
    );

    await response.body?.cancel();
    await waitForRetry(delayMs, requestInit.signal);
  }
};

function isSafeToRetry(response: Response): boolean {
  return (
    SAFE_RETRY_STATUSES.has(response.status) ||
    (response.status === 503 && response.headers.has('Retry-After'))
  );
}

function waitForRetry(
  delayMs: number,
  signal: AbortSignal | null | undefined,
): Promise<void> {
  return new Promise((resolve, reject) => {
    if (signal?.aborted) {
      reject(getAbortReason(signal));
      return;
    }

    const timeoutId = setTimeout(() => {
      signal?.removeEventListener('abort', onAbort);
      resolve();
    }, delayMs);
    const onAbort = () => {
      clearTimeout(timeoutId);
      reject(getAbortReason(signal));
    };

    signal?.addEventListener('abort', onAbort, { once: true });
  });
}

function getAbortReason(signal: AbortSignal | null | undefined): unknown {
  if (signal?.reason !== undefined) {
    return signal.reason;
  }

  const error = new Error('Request aborted');
  error.name = 'AbortError';
  return error;
}
