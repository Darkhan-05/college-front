export const ENV = {
  BASE_ORIGIN: process.env.NEXT_PUBLIC_BASE_ORIGIN || '',
  BACKEND_API_URL: process.env.NEXT_PUBLIC_BACKEND_API_URL || '',
  ADMIN_DASHBOARD_HREF: process.env.NEXT_PUBLIC_ADMIN_DASHBOARD_HREF || '',
} as const;
