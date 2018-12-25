
const INITIAL_STATE = {
  email: null,
  emaillog: null,
  password: '',
  user: null,
  error: '',
  error2: '',
  loading: false,
  fullname: ''
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case 'EMAIL_CHANGED':
      return { ...state, email: action.payload, error: '', emaillog: null };
    case 'EMAIL_CHANGED_LOG':
        return { ...state, emaillog: action.payload, error: '', email: null };
    case 'PASSWORD_CHANGED':
      return { ...state, password: action.payload, error: '' };
    case 'LOGIN_USER':
      return { ...state, loading: true, error: '' };
    case 'LOGIN_USER_SUCCESS':
      return { ...state };
    case 'LOGIN_USER_FAIL':
      return { ...state, error: action.payload.message, password: '', loading: false };
      case 'LOGIN_USER_FAIL2':
        return { ...state, error2: action.payload.message, password: '', loading: false };
      case 'NAME_CHANGED':
      return { ...state, fullname: action.payload, error: '' };
      case 'LOGOUT':
      return { INITIAL_STATE };
    default:
      return state;
  }
};
