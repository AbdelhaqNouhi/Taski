
/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
      defaultLocale: 'en',
      locales: ['en', 'fr','ar'],
  },
  images: {
      domains: ['nextui.org','heroui.com','randomuser.me'], // Add 'nextui.org' to the list of allowed domains
    },
};

export default nextConfig;
