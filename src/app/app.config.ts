import { registerLocaleData } from '@angular/common';
import localeEn from '@angular/common/locales/en';
import { ApplicationConfig, LOCALE_ID } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { errorHeadersInterceptor } from './core/interceptore/error-headers-interceptor';

registerLocaleData(localeEn);

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    { provide: LOCALE_ID, useValue: 'en-US' },
    provideHttpClient(
      withInterceptors([
        errorHeadersInterceptor
      ])
    )
  ],
};
