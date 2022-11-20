import { Fragment } from 'react';

import Account from '~/containers/Account';
import MetaTitle from '~/designs/MetaTitle';

import { useUpdateStore } from '~/hooks/useUpdateStore';
import { storeSelector } from '~/store';

import { GetStaticProps, NextPageProps } from '~/types/nextjs';

export const getStaticProps: GetStaticProps = async () => {
  await storeSelector.getState().getCategoriesApi();

  return {
    props: {
      data: { categories: storeSelector.getState().categories },
    },
  };
};

const AccountPage: NextPageProps<typeof getStaticProps> = ({ data }) => {
  useUpdateStore(data);
  return (
    <Fragment>
      <MetaTitle title="Fashion" />
      <Account />
    </Fragment>
  );
};

export default AccountPage;
