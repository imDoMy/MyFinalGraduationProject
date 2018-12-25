import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';


export const emailChanged = (text) => {
  return {
    type: 'EMAIL_CHANGED',
    payload: text
  };
};

export const emailChangedLog = (text) => {
  return {
    type: 'EMAIL_CHANGED_LOG',
    payload: text
  };
};

export const passwordChanged = (text) => {
  return {
    type: 'PASSWORD_CHANGED',
    payload: text
  };
};

export const onNameChange = (text) => {
  return {
    type: 'NAME_CHANGED',
    payload: text
  };
};

export const Logout = () => {
  return (dispatch) => {
    firebase.auth().signOut()
		.then(dispatch({ type: 'LOGOUT' }));
    Actions.Auth();
	};
};

export const erase = () => {
  return {
    type: 'LOGOUT'
  };
};

export const loginUser = ({ emaillog, password }) => {
  const email = emaillog;

  return (dispatch) => {
    dispatch({ type: 'LOGIN_USER' });

    firebase.auth().signInWithEmailAndPassword(email, password)
		.then(user => loginUserSuccess(dispatch, user))
		.catch((error) => loginUserFail2(dispatch, error));
	};
};

export const RegisterUser = ({ email, password, fullname }) => {
  return (dispatch) => {
    dispatch({ type: 'LOGIN_USER' });

    firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(user => loginUserSuccessRegister(dispatch, user, { email, fullname }))
		.catch((error) => loginUserFail(dispatch, error));
	};
};

export const UserFetchInfo = () => {
  const { currentUser } = firebase.auth();
  if (currentUser) {
  console.log('UserFetchInfo');
  console.log(currentUser.uid);

console.log('UserFetchInfo');
  return (dispatch) => {
    firebase.database().ref(`/Users/${currentUser.uid}/Info`)
      .on('value', snapshot => {
        dispatch({ type: 'FETCH_USER_INFO', payload: snapshot.val() });
      });
  };
} else {
  return (dispatch) => {
  dispatch({
    type: 'LOGOUT',
   });
};
}
};

const loginUserFail = (dispatch, error) => {
  dispatch({
    type: 'LOGIN_USER_FAIL',
    payload: error
   });
};

const loginUserFail2 = (dispatch, error) => {
  dispatch({
    type: 'LOGIN_USER_FAIL2',
    payload: error
   });
};

const loginUserSuccess = (dispatch, user) => {
  dispatch({
    type: 'LOGIN_USER_SUCCESS',
    payload: user
  });
  Actions.Main();
};

const loginUserSuccessRegister = (dispatch, user, { email, fullname }) => {
  console.log('user');
  console.log(user.user.uid);
  const uid = user.user.uid;
  console.log('user');
  firebase.database().ref(`/Users/${user.user.uid}/Info`)
    .set({ email, fullname, uid })
    .then(() => {
    dispatch({ type: 'REVIEW_CREATE' });
  });
  dispatch({
    type: 'LOGIN_USER_SUCCESS',
    payload: user
  });

  Actions.Main();
};
