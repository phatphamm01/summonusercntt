import { Fragment } from 'react';

import { GetServerSideProps } from '../../types/nextjs/index';

import Product from '~/containers/Product';
import MetaTitle from '~/designs/MetaTitle';

import { useUpdateStore } from '~/hooks/useUpdateStore';
import { storeSelector } from '~/store';

import { NextPageProps } from '~/types/nextjs';

interface IProductPage {
  name?: string;
}

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params as { slug: Array<string> };

  await storeSelector.getState().getCategoriesApi();
  await storeSelector.getState().getProductsByTypeApi({ id: slug[0] });
  await storeSelector.getState().getFacetsApi({ id: slug[0] });

  return {
    props: {
      data: {
        categories: storeSelector.getState().categories,
        facets: storeSelector.getState().facets,
        productsByType: storeSelector.getState().productsByType,
      },
    },
  };
};

const ProductPage: NextPageProps<IProductPage & typeof getServerSideProps> = ({
  data,
  name,
}) => {
  useUpdateStore(data);
  return (
    <Fragment>
      <MetaTitle
        title={name ? name.charAt(0).toUpperCase() + name.slice(1) : 'Product'}
      />
      <Product />
    </Fragment>
  );
};

export default ProductPage;
