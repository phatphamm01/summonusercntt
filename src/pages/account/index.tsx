import { Fragment } from 'react';
import Account from '~/containers/Account';
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

const AccountPage: NextPageProps<typeof getStaticProps> = ({ data }) => {
  useUpdateStore(data);
  return (
    <Fragment>
      <MetaTitle title="Fashion" />
      <Account />
    </Fragment>
  );
};

export default AccountPage;
