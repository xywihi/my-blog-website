import homeReducer from '../pages/home/store/reducer';
import cardsReducer from '../pages/cards/store/reducer';
import newsReducer from '../pages/news/store/reducer';
import { combineReducers } from 'redux';
const initialState = {
  logged:{
    status:false,
    userInfo:undefined,
  },
  notices: {
    hidde:true,
    length:0
  },
  noticeList:[],
  stopUpdateNotice:false,
  statusBoxData:{
    show:false,
    message:undefined,
    status:undefined
  },
  weatherInfo:{},
  plans:[
    {
      id:1,
      name:'上午开会',
      content:'明天上午10:30参加会议！',
      status:'1',
      startTime:1715140800000,
      endTime:1715270400000,
    },
    {
      id:2,
      name:'周末聚餐',
      content:'25号公司聚餐，出去野营...',
      status:'2',
      startTime:1715659200000,
      endTime:1715702400000,
    },
    {
      id:3,
      name:'技术研讨会',
      content:'26号参加AI科技研讨会，准备必要材料，并将材料共享到群里...',
      status:'0',
      startTime:1715745600000,
      endTime:1715788800000,
    },
    {
      id:4,
      name:'出去吃火锅',
      content:'28号晚上与XXX一起去小巷街火锅店吃火锅！',
      status:'0',
      startTime:1716609600000,
      endTime:1716825600000,
    }
  ]
};
let text=(data)=>{
  return data ? data.token : undefined
}
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'HANDLELOGIN':
      return { ...state, logged:action.data};
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
    case 'HANDLECHANGEWEATHER':
      // console.log('！！！！！！！！！！！！！！',action.data)
      return { ...state, weatherInfo:action.data};
    case 'HANDLECHANGEPLANS':
      // console.log('！！！！！！！！！！！！！！',action.data)
      return { ...state, plans:action.data};
    default:
      return state;
  }
};
const reducers = combineReducers({
  reducer,
  home: homeReducer,
  cards: cardsReducer,
  news: newsReducer,
});

export default reducers;
