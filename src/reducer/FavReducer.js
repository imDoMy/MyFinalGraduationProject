
const INITIAL_STATE = {
  loading: false
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ADDING':
      return { loading: true };
    case 'ADD_FAV':
      return { loading: false };
    case 'REMOVE_FAV':
      return { loading: false };
    default:
      return state;
  }
};
