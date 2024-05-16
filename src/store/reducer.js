import homeReducer from '../pages/home/store/reducer';
import { combineReducers } from 'redux';
const initialState = {
  notices: {
    hidde:true,
    length:0
  },
  noticeList:[],
  stopUpdateNotice:false,
  userInfo:undefined,
  statusBoxData:{
    show:false,
    message:undefined,
    status:undefined
  },
  plans:[
    {
      id:1,
      name:'计划1',
      status:1,
      startTime:1715140800000,
      endTime:1715270400000,
    },
    {
      id:2,
      name:'计划2',
      status:2,
      startTime:1715659200000,
      endTime:1715702400000,
    },
    {
      id:3,
      name:'计划3',
      status:0,
      startTime:1715745600000,
      endTime:1715788800000,
    },
    {
      id:4,
      name:'计划4',
      status:0,
      startTime:1716609600000,
      endTime:1716825600000,
    },
    {
    }
  ]
};
let text=(data)=>{
  return data ? data.token : undefined
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'UPDATENOTICENUM':
      return { ...state, notices:{...state.notices,length:action.data}};
    case 'HIDDENOTICES':
      // return { ...state, notices:{...state.notices,hidde:!state.notices.hidde}};
      return { ...state, noticeList:action.data};
    case 'CONTROLLUPDATENOTICE':
      return { ...state, stopUpdateNotice:action.data};
    case 'SHOWSTATUSBOX':
      // debugger;
      // console.log('！！！！！！！！！！！！！！',action.data)
      return { ...state, statusBoxData:action.data};
    default:
      return state;
  }
};
const reducers = combineReducers({
  reducer,
  home: homeReducer,
});

export default reducers;
