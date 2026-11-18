import envConfig from "@/config/env.config";
import jwt, { type SignOptions } from "jsonwebtoken";
import type { JwtAccessTokenPayload, JwtRefreshTokenPayload } from "../types";
import { TOKEN_ALGORITHM, TOKEN_AUDIENCE, TOKEN_ISSUER } from "../constants";
import type { UserPublic } from "@/modules/users/user.types";
import { randomUUID } from "node:crypto";

const generateAccessToken = (user: UserPublic, sessionId: string): string => {
  const payload: JwtAccessTokenPayload = {
    sub: String(user.id),
    email: user.email,
    sid: sessionId,
  };
  const options: SignOptions = {
    expiresIn: envConfig.JWT_ACCESS_EXPIRES as NonNullable<
      SignOptions["expiresIn"]
    >,
    algorithm: TOKEN_ALGORITHM,
    issuer: TOKEN_ISSUER,
    audience: TOKEN_AUDIENCE,
  };
  return jwt.sign(payload, envConfig.JWT_ACCESS_SECRET, options);
};

const generateRefreshToken = (user: UserPublic, sessionId: string) => {
  const payload: JwtRefreshTokenPayload = {
    sub: String(user.id),
    jti: randomUUID(),
    sid: sessionId,
  };
  const options: SignOptions = {
    expiresIn: envConfig.JWT_REFRESH_EXPIRES as NonNullable<SignOptions["expiresIn"]>,
    algorithm: TOKEN_ALGORITHM,
    issuer: TOKEN_ISSUER,
    audience: TOKEN_AUDIENCE,
  };
  return jwt.sign(payload, envConfig.JWT_REFRESH_SECRET, options);
};

const verifyAccessToken = () => {};
const verifyRefreshToken = () => {};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
