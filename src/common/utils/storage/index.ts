import jwt from 'jwt-decode';

import { setToken } from '../auth';

import { IUser } from '~/store/user/types';

interface IStorage {
  getUser: () => IUser | undefined;
  setUser: (token: string) => void;
}

const StorageToken: IStorage = {
  setUser: (token) => {
    setToken(token);
  },
  getUser: () => {
    const ISSERVER = typeof window === 'undefined';
    let token: string = '';
    if (!ISSERVER) {
      token = localStorage.getItem('token') || '';
    }

    if (!token) return undefined;

    let user: IUser = jwt(token);

    return user;
  },
};

export default StorageToken;
