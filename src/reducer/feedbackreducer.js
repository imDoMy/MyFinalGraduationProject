
const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'NON':
      return {};
    default:
      return state;
  }
};
