import { GetServerSidePropsContext, NextPage } from 'next';
import { checkAuth } from '@/utils/checkAuth';
import React from 'react';

import * as Api from '@/api';
import { FileItem } from '@/api/dto/files.dto';
import { Files } from '@/modules/Files';
import { NextPageWithLayout } from '../_app';
import { HomeLayouts } from '@/layouts/HomeLayouts';
import { DashboardLayout } from '@/layouts/DashboardLayouts';

interface Props {
  items: FileItem[];
}

const DashboardPage: NextPageWithLayout<Props> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files
        items={items}
        withActions
      />
    </DashboardLayout>
  );
};

DashboardPage.getLayout = (page: React.ReactNode) => {
  return <HomeLayouts title='Dashboard / Главная'>{page}</HomeLayouts>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ('redirect' in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll();

    return {
      props: {
        items,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: { items: [] },
    };
  }
};

export default DashboardPage;
