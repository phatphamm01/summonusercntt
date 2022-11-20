import {
  GetServerSideProps as GetServerSidePropsNext,
  GetStaticProps as GetStaticPropsNext,
  NextPage,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { StoreApi, UseBoundStore } from 'zustand';

import { storeSelector } from '~/store';

type PreviewData = string | false | object | undefined;

export type GetStateStore<T> = T extends UseBoundStore<StoreApi<infer Type>>
  ? Type
  : T;
export type StateStore = Partial<GetStateStore<typeof storeSelector>>;
type DataProps = { data: StateStore };

export type GetServerSideProps<
  P extends DataProps = DataProps,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = GetServerSidePropsNext<P, Q, D>;

export type GetStaticProps<
  P extends DataProps = DataProps,
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = GetStaticPropsNext<P, Q, D>;

export type NextPageProps<T> = T extends GetStaticProps<
  infer Type,
  ParsedUrlQuery,
  PreviewData
> &
  infer Rest
  ? NextPage<Type & Rest>
  : T extends GetServerSideProps<infer Type, ParsedUrlQuery, PreviewData> &
      infer Rest
  ? NextPage<Type & Rest>
  : NextPage<T>;
