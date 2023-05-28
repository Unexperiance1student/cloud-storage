import React from 'react';
import { GetServerSidePropsContext } from 'next';
import { checkAuth } from '@/utils/checkAuth';
import { NextPageWithLayout } from '../_app';

import { HomeLayouts } from '@/layouts/HomeLayouts';

import * as Api from '@/api';
import { FileItem } from '@/api/dto/files.dto';
import { DashboardLayout } from '@/layouts/DashboardLayouts';
import { Files } from '@/modules/Files';

interface Props {
  items: FileItem[];
}

const DashboardPhotos: NextPageWithLayout<Props> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} />
    </DashboardLayout>
  );
};

DashboardPhotos.getLayout = (page: React.ReactNode) => {
  return <HomeLayouts title='Dashboard / Корзина'>{page}</HomeLayouts>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ('redirect' in authProps) {
    return authProps;
  }
  try {
    const items = await Api.files.getAll('trash');

    return {
      props: {
        items,
      },
    };
  } catch (err) {
    return {
      props: { items: [] },
    };
  }
};

export default DashboardPhotos;
