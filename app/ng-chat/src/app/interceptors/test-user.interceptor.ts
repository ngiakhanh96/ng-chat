import type {
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { TestUserHeaderService } from '@ng-chat/shared-data-access';

export const testUserInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
) => {
  const testUserHeaderService = inject(TestUserHeaderService);
  const headers = testUserHeaderService.getHeaders();

  if (Object.keys(headers).length > 0) {
    req = req.clone({
      setHeaders: headers,
    });
  }

  return next(req);
};
