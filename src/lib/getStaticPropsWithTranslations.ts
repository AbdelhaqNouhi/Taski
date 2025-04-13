import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

export const getStaticPropsWithTranslations = (locales: string[]) => {
  return async ({ locale }: { locale: string }) => {
    return {
      props: {
        ...(await serverSideTranslations(locale, locales)),
      },
    };
  };
};