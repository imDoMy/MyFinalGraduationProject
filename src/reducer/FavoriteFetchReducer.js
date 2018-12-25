
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'FAVORITE_BUSINESSES_FETCH_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};
