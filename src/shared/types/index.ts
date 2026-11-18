
type ValidationErrorItem = {
  path: string;
  message: string;
};

type SuccessResponse<T> = {
  success: boolean;
  message: string;
  data: T | null;
};

type ErrorResponse = {
  success: boolean;
  message: string;
  data: null;
  errors?: ValidationErrorItem[];
  stack?: string;
};

type JwtAccessTokenPayload = {
  sub: string;
  sid: string;
  email: string;
};

type JwtRefreshTokenPayload = {
  sub: string;
  sid: string;
  jti: string;
};

export type {
  ValidationErrorItem,
  SuccessResponse,
  ErrorResponse,
  JwtAccessTokenPayload,
  JwtRefreshTokenPayload,
};
