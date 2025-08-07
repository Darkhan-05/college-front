export const ENV = {
  BASE_ORIGIN: process.env.NEXT_PUBLIC_BASE_ORIGIN || '',
  BACKEND_API_URL: process.env.NEXT_PUBLIC_BACKEND_API_URL || '',
} as const;
