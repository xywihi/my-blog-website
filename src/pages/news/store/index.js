import { configureStore } from '@reduxjs/toolkit'; // 请确保已安装 "@reduxjs/toolkit"
import newsReducer from './reducer';

const newsStore = configureStore({
  reducer: newsReducer,
});

export default newsStore;
