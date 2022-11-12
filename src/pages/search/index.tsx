import { Fragment } from 'react';
import Search from '~/containers/Search';
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
