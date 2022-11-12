import { IProduct } from '~/store/product/types';

export const getPathProductAll = (data: Array<IProduct>) => {
  let result = data?.map((path) => ({
    params: {
      slug: [path._id, path.slug],
    },
  }));

  return result;
};
