import { Fragment } from 'react';

import Wishlist from '~/containers/Wishlist';
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
    revalidate: 60 * 60 * 24,
  };
};

const WishlistPage: NextPageProps<typeof getStaticProps> = ({ data }) => {
  useUpdateStore(data);
  return (
    <Fragment>
      <MetaTitle title="Wishlist" />
      <Wishlist />
    </Fragment>
  );
};

export default WishlistPage;
