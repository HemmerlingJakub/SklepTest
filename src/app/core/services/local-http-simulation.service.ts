import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ERROR_SIMULATION_FLAG } from '../interceptore/error-simulation.context';
import { ErrorFlag } from '../interceptore/error-simulation.config';

@Injectable({ providedIn: 'root' })
export class LocalHttpSimulationService {
  private readonly http = inject(HttpClient);

  simulate(flag: ErrorFlag): Observable<void> {
    const endpoint = flag === 'INCORRECT_CART' ? 'cart' : 'payment';

    return this.http.post<void>(`/__local-simulation/${endpoint}`, null, {
      context: new HttpContext().set(ERROR_SIMULATION_FLAG, flag),
    });
  }
}
