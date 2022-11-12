import create from 'zustand';
import { IStore } from '../type';
import { IBreadcrumb, ILoading } from './types';

export interface ICommonSlice {
  overflowMenu: boolean;
  overflowUser: boolean;
  breadcrumb: IBreadcrumb;
  loading: ILoading;
}

export const uiStore = create<IStore<ICommonSlice>>((set, get) => ({
  overflowMenu: false,
  setOverflowMenu: (overflowMenu) => set({ overflowMenu }),
  overflowUser: false,
  setOverflowUser: (overflowUser) => set({ overflowUser }),
  breadcrumb: [],
  setBreadcrumb: (breadcrumb) => set({ breadcrumb }),
  loading: {
    status: 'close',
    to: 'saga',
    time: 6,
  },
  setLoading: (loading) => set({ loading }),
}));
