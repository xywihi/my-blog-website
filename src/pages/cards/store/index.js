import { configureStore } from '@reduxjs/toolkit'; // 请确保已安装 "@reduxjs/toolkit"
import cardsReducer from './reducer';

const cardsStore = configureStore({
  reducer: cardsReducer,
});

export default cardsStore;
