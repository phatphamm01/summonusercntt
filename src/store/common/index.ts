import { IStore } from '../type';
import { ICategories } from './types';

import { IDataResponse } from '~/common/utils/axios/interface';

import fetchCommon from '~/services/common';

interface ICommonSlice {
  categories: ICategories;
}

export const commonStore: IStore<ICommonSlice> = (set, get) => ({
  categories: [],
  getCategoriesApi: async (payload: string) => {
    const response: IDataResponse = await fetchCommon.getCategories();

    const { data } = response;

    set({ categories: data });
  },
  setCategories: (categories: any) =>
    set({
      categories,
    }),
});
