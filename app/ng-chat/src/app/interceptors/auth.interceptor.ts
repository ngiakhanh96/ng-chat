import type {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Auth, AUTHORIZED } from '@ng-chat/shared-data-access';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  // Get the auth token from the service.
  const authService = inject(Auth);

  if (authService.accessToken() != null && req.context.get(AUTHORIZED)) {
    // Clone the request and replace the original headers with
    // cloned headers, updated with the authorization.
    req = req.clone({
      headers: req.headers.set(
        'Authorization',
        `Bearer ${authService.accessToken()}`,
      ),
    });
  }

  // send cloned request with header to the next handler.
  return next(req);
};
