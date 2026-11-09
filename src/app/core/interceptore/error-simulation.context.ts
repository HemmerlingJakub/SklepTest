import { HttpContextToken } from '@angular/common/http';
import { ErrorFlag } from './error-simulation.config';

export const ERROR_SIMULATION_FLAG = new HttpContextToken<ErrorFlag | null>(
  () => null,
);
