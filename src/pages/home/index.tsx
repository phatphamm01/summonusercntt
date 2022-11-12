import { Fragment } from 'react';
import Home from '~/containers/Home';
import MetaTitle from '~/designs/MetaTitle';
import { useUpdateStore } from '~/hooks/useUpdateStore';
import { commonStore } from '~/store/common';
import { StoreName } from '~/store/type';
import { GetServerSideProps, NextPageProps } from '~/types/nextjs';
import fetchCommon from '~/services/common';

export const getServerSideProps: GetServerSideProps = async () => {
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
