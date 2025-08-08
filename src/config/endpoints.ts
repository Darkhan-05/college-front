export const ENDPOINTS = {
  ASSETS: '/assets/',
  GET: {
    ALL_PARTICIPANTS: '/participants'
  },
  POST: {
    FILE: '/documents',
    CONTACT: '/contacts',
    FAQ: '/faq',
    CORE_SPEAKER: '/core-speakers',
    ADMIN_LOGIN: '/admin/login',
    GOALS: '/goals',
  }
} as const;
