import { getRequestConfig } from 'next-intl/server';

// Define the locales that are supported in your application
export const locales = ['en', 'pt'];
export const defaultLocale = 'en';

export default getRequestConfig(async ({ locale }) => {
  // Import the messages for the requested locale
  const messages = (await import(`../messages/${locale}/index.json`)).default;
  
  return { 
    messages 
  };
}); 