import { Fragment } from 'react';

import ProductDetail from '~/containers/ProductDetail';
import MetaTitle from '~/designs/MetaTitle';

import { useUpdateStore } from '~/hooks/useUpdateStore';
import { storeSelector } from '~/store';

import { GetServerSideProps, NextPageProps } from '~/types/nextjs';

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params as { slug: string[] };

  await storeSelector.getState().getCategoriesApi();
  await storeSelector.getState().getProductDetailApi({ id: slug[0] });

  return {
    props: {
      data: {
        categories: storeSelector.getState().categories,
        productDetail: storeSelector.getState().productDetail,
      },
    },
  };
};

const ProductDetailPage: NextPageProps<typeof getServerSideProps> = ({
  data,
}) => {
  const productDetail = storeSelector((s) => s.productDetail);

  useUpdateStore(data);
  return (
    <Fragment>
      <MetaTitle title={productDetail?.name || 'Product'} />
      <ProductDetail />
    </Fragment>
  );
};

export default ProductDetailPage;
