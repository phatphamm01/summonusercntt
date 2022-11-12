import type { GetStaticPaths } from 'next';
import { Fragment } from 'react';
import { getPathProductByType } from '~/common/helper/product/getPathProductByType';
import { promiseAllSettled } from '~/common/utils/promise';
import Product from '~/containers/Product';
import MetaTitle from '~/designs/MetaTitle';
import { useUpdateStore } from '~/hooks/useUpdateStore';
import { commonStore } from '~/store/common';
import { productStore } from '~/store/product';
import { StoreName } from '~/store/type';
import { GetStaticProps, NextPageProps } from '~/types/nextjs';
import fetchCommon from '~/services/common';
import fetchProduct from '~/services/products';

interface IProductPage {
  name?: string;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const { data } = await fetchCommon.getCategories();
  const paths = getPathProductByType(data as any);

  return {
    paths: paths,
    fallback: 'blocking',
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { slug } = params as { slug: Array<string> };

  const [categories, productByType, facets] = await promiseAllSettled([
    fetchCommon.getCategories(),
    fetchProduct.getProductByType({ id: slug[0] }),
    fetchProduct.getFacts({ id: slug[0] }),
  ]);

  commonStore.getState().setCategories(categories?.data as any);
  productStore.getState().setProductsByType(productByType);
  productStore.getState().setFacets(facets);

  return {
    props: {
      data: [
        {
          type: StoreName.COMMON,
          data: { categories: commonStore.getState().categories },
        },
        {
          type: StoreName.PRODUCT,
          data: {
            productByType: productStore.getState().productsByType,
            facets: productStore.getState().facets,
          },
        },
      ],
    },
    revalidate: 10,
  };
};

const ProductPage: NextPageProps<IProductPage & typeof getStaticProps> = ({
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
