import create from 'zustand';
import { IStore } from '../type';
import { ICategories } from './types';

interface ICommonSlice {
  categories: ICategories;
}

export const commonStore = create<IStore<ICommonSlice>>((set, get) => ({
  categories: [],
  setCategories: (categories) =>
    set({
      categories,
    }),
}));
