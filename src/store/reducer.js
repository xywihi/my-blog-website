import homeReducer from '../pages/home/store/reducer';
import { combineReducers } from 'redux';
const initialState = {
  notices: [],
  stopUpdateNotice:false,
  userInfo:undefined
};
let text=(data)=>{
  return data ? data.token : undefined
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADDNOTICE':
      console.log("-----====",state.notices,action)
      return { ...state, notices:[...state.notices,action.data]};
    case 'UPDATENOTICE':
      let newNotices = state.notices.map(item=>{
        
        if(item.id==action.data.id){
          return {...item,unmont:true}
        }else{
          return item
        }
      })
      return { ...state, notices:newNotices};
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
