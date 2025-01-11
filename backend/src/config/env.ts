const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;

  if (value === undefined) {
    throw Error(`Missing String environment variable for ${key}`);
  }

  return value;
};

export const PORT = getEnv("PORT", "8000");
export const NODE_ENV = getEnv("NODE_ENV", "development");

export const MONGO_URI = getEnv("MONGO_URI");

export const ACCESS_TOKEN_SECRET = getEnv("ACCESS_TOKEN_SECRET");
export const REFRESH_TOKEN_SECRET = getEnv("REFRESH_TOKEN_SECRET");

export const RESEND_API_KEY = getEnv("RESEND_API_KEY");
export const EMAIL_SENDER = getEnv("EMAIL_SENDER");

export const CLIENT_URL = getEnv("CLIENT_URL");

export const CLOUDINARY_CLOUD_NAME = getEnv("CLOUDINARY_CLOUD_NAME");
export const CLOUDINARY_API_KEY = getEnv("CLOUDINARY_API_KEY");
export const CLOUDINARY_API_SECRET = getEnv("CLOUDINARY_API_SECRET");
