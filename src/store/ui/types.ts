import { ReactChild } from 'react';

export type IBooleanPayload = boolean;

interface IBreadcrumbLink {
  name?: string;
  link?: string;
}
export type IBreadcrumb = Array<IBreadcrumbLink>;
export type IBreadcrumbPayload = Array<IBreadcrumbLink>;

export type IStatusLoading = 'start' | 'end' | 'close';
type IToLoading = 'link' | 'saga';
export interface ILoading {
  status?: IStatusLoading;
  to?: IToLoading;
  time?: number;
}
export interface ILoadingPayload {
  status: IStatusLoading;
  to?: IToLoading;
  time?: number;
}

export interface IDropdown extends Record<string, any> {
  imageCovers?: string[];
  brand?: string;
  name?: string;
  price?: string;
  id?: string;
  slug?: string;
}
