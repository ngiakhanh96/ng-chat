import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import {
  ApplicationConfig,
  ErrorHandler,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import {
  MAT_RIPPLE_GLOBAL_OPTIONS,
  MATERIAL_ANIMATIONS,
} from '@angular/material/core';
import {
  PreloadAllModules,
  provideRouter,
  withExperimentalAutoCleanupInjectors,
  withInMemoryScrolling,
  withPreloading,
  withViewTransitions,
} from '@angular/router';
import {
  GoogleLoginProvider,
  provideSocialAuth,
  SharedStore,
} from '@ng-chat/shared-data-access';
import { GlobalErrorHandler } from './global-error-handler';
import { authInterceptor } from './interceptors/auth.interceptor';
import { globalHttpErrorInterceptor } from './interceptors/global-http-error.interceptor';
import { mainRoutes } from './routes';

export const appConfig: ApplicationConfig = {
  providers: [
    SharedStore,
    provideZonelessChangeDetection(),
    provideBrowserGlobalErrorListeners(),
    { provide: ErrorHandler, useClass: GlobalErrorHandler },
    {
      provide: MAT_RIPPLE_GLOBAL_OPTIONS,
      useValue: {
        animation: {
          enterDuration: 200,
          exitDuration: 200,
        },
      },
    },
    {
      provide: MATERIAL_ANIMATIONS,
      useValue: {
        animationsDisabled: false,
      },
    },
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
      withInterceptors([authInterceptor, globalHttpErrorInterceptor]),
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
    // provideAppInitializer(async () => {
    //   const iconRegistry = inject(MatIconRegistry);
    //   const domSanitizer = inject(DomSanitizer);
    //   const appSettingsService = inject(AppSettingsService);
    //   const defaultFontSetClasses = iconRegistry.getDefaultFontSetClass();
    //   const outlinedFontSetClasses = defaultFontSetClasses
    //     .filter((fontSetClass) => fontSetClass !== 'material-icons')
    //     .concat(['material-symbols-outlined']);
    //   iconRegistry.setDefaultFontSetClass(...outlinedFontSetClasses);
    //   iconRegistry.addSvgIconSet(
    //     domSanitizer.bypassSecurityTrustResourceUrl('assets/icons.svg'),
    //   );
    //   return await appSettingsService.getAppConfig();
    // }),
  ],
};
