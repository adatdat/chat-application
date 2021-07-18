import dotenv from 'dotenv';
dotenv.config();

export const env = process.env.NODE_ENV;
export const port = process.env.PORT;
export const logs = process.env.NODE_ENV === 'production' ? 'combined' : 'dev';
export const CLIENT_URL = process.env.CLIENT_URL;
export const SERVER_URL = process.env.SERVER_URL;
export const ADMIN_URL = process.env.ADMIN_URL;
export const DATABASE_URI = process.env.DATABASE_URI;
export const jwt = {
  secret: process.env.JWT_SECRET,
  accessExpirationMinutes: process.env.JWT_EXPIRATION_MINUTES,
  refreshTokenExpirationDays: process.env.JWT_REFRESH_EXPIRATION_DAYS
};
