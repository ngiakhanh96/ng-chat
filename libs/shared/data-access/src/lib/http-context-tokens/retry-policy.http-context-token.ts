import { HttpContextToken } from '@angular/common/http';
import { DEFAULT_RETRY_POLICY, RetryPolicy } from '../http/retry-policy';

export interface HttpRetryPolicy extends RetryPolicy {
  readonly enabled: boolean;
}

export const DEFAULT_HTTP_RETRY_POLICY: HttpRetryPolicy = {
  enabled: true,
  ...DEFAULT_RETRY_POLICY,
};

export const HTTP_RETRY_POLICY = new HttpContextToken<HttpRetryPolicy>(
  () => DEFAULT_HTTP_RETRY_POLICY,
);
