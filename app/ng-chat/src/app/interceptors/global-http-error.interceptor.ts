import {
  HttpErrorResponse,
  type HttpHandlerFn,
  type HttpInterceptorFn,
  type HttpRequest,
} from '@angular/common/http';
import {
  getRetryDelayMs,
  HTTP_RETRY_POLICY,
  type HttpRetryPolicy,
} from '@ng-chat/shared-data-access';
import { retry, throwError, timer } from 'rxjs';

const RETRYABLE_METHODS = new Set(['GET', 'HEAD', 'OPTIONS']);
const RETRYABLE_STATUSES = new Set([0, 408, 425, 429, 500, 502, 503, 504]);

export const globalHttpErrorInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const retryPolicy = req.context.get(HTTP_RETRY_POLICY);
  if (!shouldConfigureRetry(req, retryPolicy)) {
    return next(req);
  }

  return next(req).pipe(
    retry({
      count: retryPolicy.maxRetries,
      delay: (resp: HttpErrorResponse, retryIndex) => {
        if (!isRetryableError(resp)) {
          return throwError(() => resp);
        }

        return timer(
          getRetryDelayMs(
            retryIndex,
            retryPolicy,
            resp.headers.get('Retry-After'),
          ),
        );
      },
    }),
  );
};

function shouldConfigureRetry(
  req: HttpRequest<unknown>,
  policy: HttpRetryPolicy,
): boolean {
  return (
    policy.enabled &&
    policy.maxRetries > 0 &&
    RETRYABLE_METHODS.has(req.method.toUpperCase())
  );
}

function isRetryableError(error: unknown): error is HttpErrorResponse {
  return (
    error instanceof HttpErrorResponse &&
    RETRYABLE_STATUSES.has(error.status) &&
    !isAbortError(error.error)
  );
}

function isAbortError(error: unknown): boolean {
  return (
    typeof error === 'object' &&
    error !== null &&
    'name' in error &&
    error.name === 'AbortError'
  );
}
