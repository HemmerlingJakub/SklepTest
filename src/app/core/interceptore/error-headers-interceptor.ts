import {
  HttpErrorResponse,
  HttpHeaders,
  HttpInterceptorFn,
  HttpResponse,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, map, of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ERROR_SIMULATION_FLAG } from './error-simulation.context';
import { ERROR_CONFIG } from './error-simulation.config';

export const errorHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  const snackBar = inject(MatSnackBar);
  const flag = req.context.get(ERROR_SIMULATION_FLAG);
  let response$;

  if (flag && ERROR_CONFIG[flag] === 1) {
    response$ = throwError(() => new HttpErrorResponse({
      error: { code: flag },
      status: 400,
      statusText: 'Bad Request',
      url: req.urlWithParams,
      headers: new HttpHeaders({ [flag]: '1' }),
    }));
  } else if (flag) {
    response$ = of(new HttpResponse({
      status: 200,
      statusText: 'OK',
      url: req.urlWithParams,
    }));
  } else {
    response$ = next(req);
  }

  return response$.pipe(
    map((event) => {
      if (event instanceof HttpResponse) {
        const message = getErrorMessage(event.headers);
        if (message) {
          throw new HttpErrorResponse({
            error: 'HTTP_HEADER_ERROR',
            status: 400,
            statusText: 'Bad Request',
            url: req.urlWithParams,
            headers: event.headers,
          });
        }
      }
      return event;
    }),
    catchError((error: unknown) => {
      if (error instanceof HttpErrorResponse) {
        const message = getErrorMessage(error.headers);
        if (message) {
          snackBar.open(message, 'Close', { duration: 5000 });
        }
      }
      return throwError(() => error);
    }),
  );
};

function getErrorMessage(headers: HttpHeaders): string | null {
  const messages: string[] = [];

  if (headers.get('INCORRECT_CART') === '1') {
    messages.push('Cannot add the product to the cart.');
  }
  if (headers.get('INCORRECT_PAYWALL') === '1') {
    messages.push('An error occurred while integrating payments.');
  }
  return messages.length ? messages.join(' ') : null;
}