export const ENDPOINTS = {
  ASSETS: '/assets/',
  GET: {
    ALL_PARTICIPANTS: '/participants',
    ALL_SPONSORS: '/sponsors'
  },
  POST: {
    FILE: '/documents',
    CONTACT: '/contacts',
    FAQ: '/faq',
    CORE_SPEAKER: '/core-speakers',
    ADMIN_LOGIN: '/admin/login',
    MAIN_INFO: '/main-info',
    GOALS: '/goals',
    SEND_FINAL_EMAIL_SPEAKER: (id: string) => `/participants/${id}/speaker/send-final-email`
  }
} as const;
