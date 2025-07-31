import { defineRouting } from 'next-intl/routing';
import { LANGUAGES } from '@/config/languages';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: LANGUAGES.map((lng) => lng.code),
  // Used when no locale matches
  defaultLocale: LANGUAGES.map((lng) => lng.code)[0],
});
