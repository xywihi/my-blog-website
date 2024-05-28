
const initialState = {
    newsData:[],
  };
  
  const newsReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'HANDLE_CHANGE_NEWS':
        return { ...state, newsData: action.data };
      default:
        return state;
    }
  };
  
  export default newsReducer;
  