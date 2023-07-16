import { config } from 'dotenv';

config();

export const environmentVariables = {
  dbUrl: process.env.DATABASE_URL,
  secret: process.env.SECRET_KEY,
  expires_in: process.env.EXPIRES_IN,
  audience: process.env.AUDIENCE,
  issuer: process.env.ISSUER,
};
