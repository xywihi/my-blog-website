import { configureStore } from '@reduxjs/toolkit'; // 请确保已安装 "@reduxjs/toolkit"
import homeReducer from './reducer';

const homeStore = configureStore({
  reducer: homeReducer,
});

export default homeStore;
