import homeReducer from '../pages/home/store/reducer';
import { combineReducers } from 'redux';
const initialState = {
  notices: {
    hidde:true,
    length:0
  },
  stopUpdateNotice:false,
  userInfo:undefined
};
let text=(data)=>{
  return data ? data.token : undefined
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATENOTICENUM':
      return { ...state, notices:{...state.notices,length:action.data}};
    case 'HIDDENOTICES':
      return { ...state, notices:{...state.notices,hidde:!state.notices.hidde}};
    case 'CONTROLLUPDATENOTICE':
      console.log('/////',action)
      return { ...state, stopUpdateNotice:action.data};
    default:
      return state;
  }
};
const reducers = combineReducers({
  reducer,
  home: homeReducer,
});

export default reducers;
