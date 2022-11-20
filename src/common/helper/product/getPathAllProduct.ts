import { IProduct } from '~/store/product/types';

export const getPathProductAll = (data: Array<IProduct>) => {
  if (!Array.isArray(data)) return [];

  let result = data.map((path) => ({
    params: {
      slug: [path._id, path.slug],
    },
  }));

  return result;
};
