import '@/styles/globals.css';
import { NextPage } from 'next';
import type { AppProps } from 'next/app';
import React from 'react';

interface Props extends AppProps {
  Component: AppProps['Component'] & {
    getLayout: (page: React.ReactElement) => React.ReactNode;
  };
}

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

export default function App({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout ?? ((page) => page);

  return getLayout(<Component {...pageProps} />);
}
