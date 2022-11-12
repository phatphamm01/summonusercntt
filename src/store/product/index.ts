import create from 'zustand';
import { IStore } from '../type';
import {
  IAllProducts,
  IFacets,
  IProductDetail,
  IProductsByType,
} from './types';

interface IProductSlice {
  productsByType: IProductsByType;
  searchProduct: IProductsByType;
  allProducts: IAllProducts;
  facets: IFacets;
  productDetail: IProductDetail;
}

export const productStore = create<IStore<IProductSlice>>((set, get) => ({
  productsByType: [],
  setProductsByType: (productsByType) => set({ productsByType }),
  searchProduct: [],
  setSearchProduct: (searchProduct) => set({ searchProduct }),
  allProducts: [],
  setAllProducts: (allProducts) => set({ allProducts }),
  facets: [],
  setFacets: (facets) => set({ facets }),
  productDetail: {},
  setProductDetail: (productDetail) => set({ productDetail }),
}));
