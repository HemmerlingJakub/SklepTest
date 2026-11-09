export type ErrorFlag = 'INCORRECT_CART' | 'INCORRECT_PAYWALL';

export const ERROR_CONFIG: Record<ErrorFlag, 0 | 1> = {
  INCORRECT_CART: 0,
  INCORRECT_PAYWALL: 0,
};
