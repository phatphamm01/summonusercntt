import { Fragment } from 'react';

import Search from '~/containers/Search';
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

interface IProductPage {
  name?: string;
}

const ProductPage: NextPageProps<IProductPage & typeof getStaticProps> = ({
  name,
  data,
}) => {
  useUpdateStore(data);
  return (
    <Fragment>
      <MetaTitle title={'Product'} />
      <Search />
    </Fragment>
  );
};

export default ProductPage;
