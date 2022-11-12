import { Fragment } from 'react';
import Cart from '~/containers/Cart';
import MetaTitle from '~/designs/MetaTitle';
import { useUpdateStore } from '~/hooks/useUpdateStore';
import { commonStore } from '~/store/common';
import { StoreName } from '~/store/type';
import { GetStaticProps, NextPageProps } from '~/types/nextjs';
import fetchCommon from '~/services/common';

export const getStaticProps: GetStaticProps = async () => {
  const categories = fetchCommon.getCategories();

  commonStore.getState().setCategories((await categories).data as any);
  return {
    props: {
      data: [
        {
          type: StoreName.COMMON,
          data: { categories: commonStore.getState().categories },
        },
      ],
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
