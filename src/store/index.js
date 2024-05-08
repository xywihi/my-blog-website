import { configureStore } from '@reduxjs/toolkit'; // 请确保已安装 "@reduxjs/toolkit"
import reducers from './reducer';

const store = configureStore({
  reducer: reducers,
});
// export default rootReducer;

export default store;
