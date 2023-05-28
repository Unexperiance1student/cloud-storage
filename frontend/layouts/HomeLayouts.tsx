import Head from 'next/head';
import React from 'react';

import styles from '@/styles/Home.module.scss';
import Header from '@/components/Header';

interface LayoutProps {
  title: string;
}

export const HomeLayouts: React.FC<React.PropsWithChildren<LayoutProps>> = ({
  title,
  children,
}) => {
  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <main>
        <Header />
        <div className={styles.main}>
          <div className={styles.layout}>{children}</div>
        </div>
      </main>
    </>
  );
};
