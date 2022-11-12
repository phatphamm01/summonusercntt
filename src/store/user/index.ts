import create from 'zustand';
import { IStore } from '../type';
import { IBillList, ICartList, IUser, IWishlist } from './types';

interface IUserSlice {
  user: IUser;
  wishlist: IWishlist;
  cart: ICartList;
  bill: IBillList;
}

export const userStore = create<IStore<IUserSlice>>((set, get) => ({
  user: {},
  setUser: (user) => set({ user }),
  wishlist: [],
  setWishlist: (wishlist) => set({ wishlist }),
  cart: [],
  setCart: (cart) => set({ cart }),
  bill: [],
  setBill: (bill) => set({ bill }),
}));
