
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'REVIEWS2_FETCH_SUCCESS':
      return action.payload;
    default:
      return state;
  }
};
