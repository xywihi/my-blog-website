
const initialState = {
  music: null,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PLAYMUSIC':
      console.log("{ ...state, music: action.data }",{ ...state, music: action.data })
      return { ...state, music: action.data };
    default:
      return state;
  }
};

export default homeReducer;
