
const initialState = {
  music: null,
};

const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'PLAYMUSIC':
      return { ...state, music: action.data };
    default:
      return state;
  }
};

export default homeReducer;
