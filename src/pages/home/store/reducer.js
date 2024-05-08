
const initialState = {
  music: null,
  time:{
    // 当前播放时间
    currentTime: '--:--',
    // 总时长
    duration: '--:--',
  },
  pauseCurrent:false,
  showArea:false,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PLAYMUSIC':
      return { ...state, music: !action.data ? null : {...action.data,old:state.music?.id} };
    case 'SETMUSICTIME':
      return { ...state, time: {...state.time,...action.data} };
    case 'PAUSEMUSIC':
      return { ...state, pauseCurrent: action.data };
    case 'HANDLESHOWAREA':
      return { ...state, showArea: action.data };
    default:
      return state;
  }
};

export default homeReducer;
