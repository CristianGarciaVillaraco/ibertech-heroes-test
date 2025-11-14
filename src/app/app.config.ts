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
import { ConfigService } from './core/services/config/config.service';

export function initialiczeConfig() {
  const configService = inject(ConfigService);
  return () => configService.load();
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideAppInitializer(initialiczeConfig()),
    provideHttpClient(withInterceptorsFromDi()),
    fakeBackendProvider,
  ],
};
