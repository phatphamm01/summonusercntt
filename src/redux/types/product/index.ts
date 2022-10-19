import { PayloadAction } from "@reduxjs/toolkit";

export type IProductsByType = Array<IProduct>;
export type IAllProducts = Array<IProduct>;
export type IFacets = Array<IFacet>;

export interface IFacet {
  name: string;
  values: Array<{ name: string; id: string }>;
}

export interface IVariant {
  _id?: string;
  product?: string;
  price?: string;
  discountPrice?: number;
  size?: string;
}

export interface IProductDetail {
  _id?: string;
  name?: string;
  category?: string;
  categoryName?: string;
  brand?: string;
  imageCovers?: string[];
  images?: string[];
  longDescription?: string;
  shortDescription?: string;
  categoryPath?: string;
  isFeatured?: true;
  slug?: string;

  discountPrice?: number;
  price?: number;
  variants?: IVariant[];
}

export interface IProduct {
  _id: string;
  name: string;
  category: string;
  categoryName: string;
  brand: string;
  imageCovers: string[];
  images: string[];
  categoryPath: string;
  isFeatured: boolean;
  slug: string;
  discountPrice: number;
  price: number;
}

export interface IGetProductsByTypePayload {
  id: string;
  params?: string;
}

export interface IGetProductDetailPayload {
  id: string;
}

export interface IGetFacetsPayload {
  id: string;
}
