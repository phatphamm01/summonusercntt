import type { NextPage } from 'next';
import { Fragment } from 'react';

import Error from '~/containers/Error';
import MetaTitle from '~/designs/MetaTitle';

import { storeSelector } from '~/store';

import fetchCommon from '~/services/common';

const ErrorPage: NextPage = (props) => {
  return (
    <Fragment>
      <MetaTitle title="Fashion" />
      <Error />
    </Fragment>
  );
};

export default ErrorPage;

export async function getStaticProps() {
  const [categories] = await Promise.all([fetchCommon.getCategories()]);

  storeSelector.getState().setCategories(categories.data as any);
  return { props: {} };
}
