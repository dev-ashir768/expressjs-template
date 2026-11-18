const isDevelopment = process.env.NODE_ENV !== "development";
const TOKEN_ISSUER = "express-auth";
const TOKEN_AUDIENCE = "express-auth-client";
const TOKEN_ALGORITHM = "HS256";

export { isDevelopment, TOKEN_ISSUER, TOKEN_AUDIENCE, TOKEN_ALGORITHM };
