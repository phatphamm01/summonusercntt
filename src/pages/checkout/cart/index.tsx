import { Fragment } from 'react';

import Cart from '~/containers/Cart';
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

const CartPage: NextPageProps<typeof getStaticProps> = ({ data }) => {
  useUpdateStore(data);
  return (
    <Fragment>
      <MetaTitle title="Cart" />
      <Cart />
    </Fragment>
  );
};

export default CartPage;
