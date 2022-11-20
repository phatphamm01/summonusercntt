import { Fragment } from 'react';

import Home from '~/containers/Home';
import MetaTitle from '~/designs/MetaTitle';

import { useUpdateStore } from '~/hooks/useUpdateStore';
import { storeSelector } from '~/store';

import { GetServerSideProps, NextPageProps } from '~/types/nextjs';

export const getServerSideProps: GetServerSideProps = async () => {
  await storeSelector.getState().getCategoriesApi();
  return {
    props: {
      data: {
        categories: storeSelector.getState().categories,
      },
    },
  };
};

const HomePage: NextPageProps<typeof getServerSideProps> = ({
  children,
  data,
}) => {
  useUpdateStore(data);
  return (
    <Fragment>
      <MetaTitle title="Fashion" />
      <Home />
    </Fragment>
  );
};

export default HomePage;
