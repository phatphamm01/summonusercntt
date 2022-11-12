import * as toolkit from '@reduxjs/toolkit';
import { Persistor } from 'redux-persist';
import { Store as StoreRedux, Task } from 'redux-saga';

declare module '@reduxjs/toolkit' {
  interface Store extends StoreRedux {
    sagaTask: Task;
    __persistor: Persistor;
  }
}
