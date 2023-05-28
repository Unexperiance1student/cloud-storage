import { GetServerSidePropsContext, NextPage } from 'next';
import { User } from '@/api/dto/auth.dto';
import { Button } from 'antd';

import styles from '@/styles/Profile.module.scss';
import { checkAuth } from '@/utils/checkAuth';
import * as Api from '@/api';
import React from 'react';
import { HomeLayouts } from '@/layouts/HomeLayouts';
import { NextPageWithLayout } from '../_app';

interface Props {
  userData: User;
}

const DashboardProfilePage: NextPageWithLayout<Props> = ({ userData }) => {
  const onClickLogOut = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      Api.auth.logout();
      location.href = '/';
    }
  };

  return (
    <main>
      <div className={styles.root}>
        <h1>Мой профиль</h1>
        <br />
        <p>
          ID: <b>{userData.id}</b>
        </p>
        <p>
          Полное имя: <b>{userData.fullName}</b>
        </p>
        <p>
          E-Mail: <b>{userData.email}</b>
        </p>
        <br />
        <Button
          onClick={onClickLogOut}
          type='primary'
          danger>
          Выйти
        </Button>
      </div>
    </main>
  );
};

DashboardProfilePage.getLayout = (page: React.ReactNode) => {
  return <HomeLayouts title='Dashboard / Профиль'>{page}</HomeLayouts>;
};
export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ('redirect' in authProps) {
    return authProps;
  }

  const userData = await Api.auth.getMe();

  return {
    props: {
      userData,
    },
  };
};

export default DashboardProfilePage;
