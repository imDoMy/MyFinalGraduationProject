

const INITIAL_STATE = {
  Language: 'Arabic'
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'ARABIC_LANGUAGE':
      return { Language: 'Arabic' };
      case 'ENGLISH_LANGUAGE':
        return { Language: 'English' };
  default:
      return state;
  }
};
