import { getRequestConfig } from 'next-intl/server';

// Define the locales that are supported in your application
export const locales = ['en', 'pt'];
export const defaultLocale = 'en';

export default getRequestConfig(async ({ locale }) => {
  // Make sure locale is not undefined and has a default fallback
  const activeLocale = locale || defaultLocale;
  
  // Import the messages for the requested locale
  const messages = (await import(`../../messages/${activeLocale}/index.json`)).default;
  
  return { 
    locale: activeLocale,
    messages,
    timeZone: 'Europe/Lisbon'
  };
}); 