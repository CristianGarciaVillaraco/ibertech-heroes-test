import {
  ApplicationConfig,
  inject,
  provideAppInitializer,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import {
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { fakeBackendProvider } from './core/interceptors/fake-back/fake-back.interceptor';
import { InitDbService } from './core/services/init-db/init-db.service';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideHttpClient(withInterceptorsFromDi()),
    provideAppInitializer(() => {
      const initDb = inject(InitDbService);
      return initDb.init();
    }),
    fakeBackendProvider,
  ],
};
