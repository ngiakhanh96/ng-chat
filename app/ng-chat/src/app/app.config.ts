import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  ErrorHandler,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  PreloadAllModules,
  provideRouter,
  withExperimentalAutoCleanupInjectors,
  withInMemoryScrolling,
  withPreloading,
  withViewTransitions,
} from '@angular/router';
import {
  CloseOutline,
  CopyOutline,
  DeleteOutline,
  EditOutline,
  MenuOutline,
  MessageOutline,
  MoreOutline,
  PaperClipOutline,
  PlusOutline,
  ReloadOutline,
  RobotOutline,
  SearchOutline,
  SendOutline,
  UserOutline,
} from '@ant-design/icons-angular/icons';
import {
  AppSettingsService,
  GoogleLoginProvider,
  provideSocialAuth,
  SharedStore,
} from '@ng-chat/shared-data-access';
import { provideNzIcons } from 'ng-zorro-antd/icon';
import { GlobalErrorHandler } from './global-error-handler';
import { authInterceptor } from './interceptors/auth.interceptor';
import { globalHttpErrorInterceptor } from './interceptors/global-http-error.interceptor';
import { testUserInterceptor } from './interceptors/test-user.interceptor';
import { mainRoutes } from './routes';

export const appConfig: ApplicationConfig = {
  providers: [
    SharedStore,
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    provideNzIcons([
      CloseOutline,
      CopyOutline,
      DeleteOutline,
      EditOutline,
      MenuOutline,
      MessageOutline,
      MoreOutline,
      PaperClipOutline,
      PlusOutline,
      ReloadOutline,
      RobotOutline,
      SearchOutline,
      SendOutline,
      UserOutline,
    ]),
    provideRouter(
      mainRoutes,
      withPreloading(PreloadAllModules),
      withViewTransitions(),
      withInMemoryScrolling({
        scrollPositionRestoration: 'top',
      }),
      withExperimentalAutoCleanupInjectors(),
    ),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        authInterceptor,
        testUserInterceptor,
        globalHttpErrorInterceptor,
      ]),
    ),
    provideSocialAuth({
      autoLogin: false,
      lang: 'en',
      providers: [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider(
            '387433020564-0q4ii59780k1ecqvueub42qj1ohdpktv.apps.googleusercontent.com',
            {
              scopes: `https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtube.channel-memberships.creator https://www.googleapis.com/auth/youtube.force-ssl https://www.googleapis.com/auth/youtube.readonly https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtubepartner-channel-audit`,
            },
          ),
        },
      ],
      onError: (err) => {
        console.error(err);
      },
    }),
    provideAppInitializer(async () => {
      const appSettingsService = inject(AppSettingsService);
      return await appSettingsService.getAppConfig();
    }),
  ],
};
