
const initialState = {
    layoutNum:0,
  };
  
  const homeReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'HANDLE_CHANGE_LAYOUT':
        return { ...state, layoutNum: action.data };
      default:
        return state;
    }
  };
  
  export default homeReducer;
  