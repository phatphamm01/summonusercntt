import type { GetStaticPaths } from 'next';
import { Fragment } from 'react';
import { getPathProductAll } from '~/common/helper/product/getPathAllProduct';
import { promiseAllSettled } from '~/common/utils/promise';
import ProductDetail from '~/containers/ProductDetail';
import MetaTitle from '~/designs/MetaTitle';
import { commonStore } from '~/store/common';
import { productStore } from '~/store/product';
import { StoreName } from '~/store/type';
import { GetStaticProps, NextPageProps } from '~/types/nextjs';
import fetchCommon from '~/services/common';
import fetchProduct from '~/services/products';

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await fetchProduct.getAllProduct({});
  console.log(data);

  const paths = getPathProductAll(data);

  return {
    paths: paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: string[] };

  const [categories, product] = await promiseAllSettled([
    fetchCommon.getCategories(),
    fetchProduct.getProductDetail({ id: slug[0] }),
  ]);

  commonStore.getState().setCategories(categories?.data as any);
  productStore.getState().setProductDetail(product);

  return {
    props: {
      data: [
        {
          type: StoreName.COMMON,
          data: { categories: commonStore.getState().categories },
        },
        {
          type: StoreName.PRODUCT,
          data: { productDetail: productStore.getState().productDetail },
        },
      ],
    },
    revalidate: 10,
  };
};

const ProductDetailPage: NextPageProps<typeof getStaticProps> = ({ data }) => {
  console.log({ data });

  const productDetail = productStore((s) => s.productDetail);
  // useUpdateStore(data);
  return (
    <Fragment>
      <MetaTitle title={productDetail?.name || 'Product'} />
      <ProductDetail />
    </Fragment>
  );
};

export default ProductDetailPage;
