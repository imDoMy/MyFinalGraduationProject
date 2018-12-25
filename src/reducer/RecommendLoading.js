
const INITIAL_STATE = { loading: false };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOADING':
      return { loading: true };
      case 'RLOADING':
        return { loading: false };
    default:
      return state;
  }
};
