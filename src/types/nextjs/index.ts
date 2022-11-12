import {
  GetServerSideProps as GetServerSidePropsNext,
  GetStaticProps as GetStaticPropsNext,
  NextPage,
} from 'next';
import { ParsedUrlQuery } from 'querystring';
import { IStoreProps } from '~/store/type';

type PreviewData = string | false | object | undefined;

export type GetServerSideProps<
  P extends { data: Array<IStoreProps> } = { data: Array<IStoreProps> },
  Q extends ParsedUrlQuery = ParsedUrlQuery,
  D extends PreviewData = PreviewData
> = GetServerSidePropsNext<P, Q, D>;

export type GetStaticProps<
  P extends { data: Array<IStoreProps> } = { data: Array<IStoreProps> },
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
