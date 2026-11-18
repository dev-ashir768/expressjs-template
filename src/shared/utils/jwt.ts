import envConfig from "@/config/env.config";
import jwt, { type SignOptions, type VerifyOptions } from "jsonwebtoken";
import type { JwtAccessTokenPayload, JwtRefreshTokenPayload } from "../types";
import { TOKEN_ALGORITHM, TOKEN_AUDIENCE, TOKEN_ISSUER } from "../constants";
import { randomUUID } from "node:crypto";

const generateAccessToken = (userId: string, email: string, sessionId: string): string => {
  const payload: JwtAccessTokenPayload = {
    sub: userId,
    email,
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

const generateRefreshToken = (userId: string, sessionId: string) => {
  const payload: JwtRefreshTokenPayload = {
    sub: userId,
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

const verifyAccessToken = (token: string) => {
  const options: VerifyOptions = {
    algorithms: [TOKEN_ALGORITHM],
    issuer: TOKEN_ISSUER,
    audience: TOKEN_AUDIENCE,
  }
  return jwt.verify(token, envConfig.JWT_ACCESS_SECRET, options)
};
const verifyRefreshToken = (token: string) => {
  const options: VerifyOptions = {
    algorithms: [TOKEN_ALGORITHM],
    issuer: TOKEN_ISSUER,
    audience: TOKEN_AUDIENCE,
  }
  return jwt.verify(token, envConfig.JWT_REFRESH_SECRET, options)
};

export {
  generateAccessToken,
  generateRefreshToken,
  verifyAccessToken,
  verifyRefreshToken,
};
