import * as dotenv from 'dotenv';
dotenv.config();

export const APP_ENV =
  process.env.APP_ENV || process.env.NODE_ENV || 'development';

export const LOG_ENV = process.env.LOG_ENV || 'development';

export const APP_PORT = process.env.PORT || 3000;

export const QUEUE_URL = process.env.SUNBIRD_QUEUE_URL;

export const DBConfig = {
  url: process.env.DB_URL,
};

export const DEFAULT_AWS_CONFIG = {
  region: process.env.DEFAULT_AWS_REGION,
  accessKeyId: process.env.DEFAULT_AWS_ACCESS_KEY,
  secretAccessKey: process.env.DEFAULT_AWS_SECRET_KEY,
};
