import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const reviewUpdate = ({ prop, value }) => {
  return {
    type: 'REVIEW_TYPE',
    payload: { prop, value }
  };
};

export const WriteReview = ({ restaurant_name, restaurant_nameE, UserName, UserComment, rate, rateing_image, uid, date, month, year }) => {

 const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/Businesses/${uid}/Reviews`)
      .push({ UserName, UserComment, rate, rateing_image, date, month, year })
      .then(firebase.database().ref(`/Users/${currentUser.uid}/Reviews`)
        .push({ UserName, UserComment, rate, rateing_image, restaurant_name, restaurant_nameE, date, month, year })
        .then(() => {
        dispatch({ type: 'REVIEW_CREATE' });
      })
        );
  };
};

export const WriteReviewSec2 = ({ restaurant_name, restaurant_nameE, UserName, UserComment, rate, rateing_image, uid, date, month, year }) => {

 const { currentUser } = firebase.auth();

  return (dispatch) => {
    firebase.database().ref(`/Businesses/${uid}/Reviews2`)
      .push({ UserName, UserComment, rate, rateing_image, date, month, year })
      .then(firebase.database().ref(`/Users/${currentUser.uid}/Reviews`)
        .push({ UserName, UserComment, rate, rateing_image, restaurant_name, restaurant_nameE, date, month, year })
        .then(() => {
        dispatch({ type: 'REVIEW_CREATE' });
      })
        );
  };
};

export const TransReviewSec2 = ({ UserName, UserComment, rate, rateing_image, uid, ruid, date, month, year }) => {

 const { currentUser } = firebase.auth();
console.log(uid);
  return (dispatch) => {
    firebase.database().ref(`/Businesses/${uid}/Reviews`)
      .push({ UserName, UserComment, rate, rateing_image, date, month, year })
      .then(firebase.database().ref(`/Businesses/${uid}/Reviews2/${ruid}`)
        .remove()
        .then(() => {
        dispatch({ type: 'REVIEW_CREATE' });
      })
        );
  };
};


export const ReviewsFetch = ({ uid }) => {
  return (dispatch) => {
    firebase.database().ref(`/Businesses/${uid}/Reviews`)
      .on('value', snapshot => {
        dispatch({ type: 'REVIEWS_FETCH_SUCCESS', payload: snapshot.val() });
      });
  };
};

export const ReviewsFetchSec2 = ({ uid }) => {
  console.log(uid);
  return (dispatch) => {
    firebase.database().ref(`/Businesses/${uid}/Reviews2`)
      .on('value', snapshot => {
        dispatch({ type: 'REVIEWS2_FETCH_SUCCESS', payload: snapshot.val() });
      });
  };
};

export const UserReviewsFetch = ({ uid }) => {
  if (uid === '1') {
    const { currentUser } = firebase.auth();

    return (dispatch) => {
      firebase.database().ref(`/Users/${currentUser.uid}/Reviews`)
        .on('value', snapshot => {
          dispatch({ type: 'USER_REVIEWS_FETCH_SUCCESS', payload: snapshot.val() });
        });
    };
  }
  return (dispatch) => {
    firebase.database().ref(`/Users/${uid}/Reviews`)
      .on('value', snapshot => {
        dispatch({ type: 'USER_REVIEWS_FETCH_SUCCESS', payload: snapshot.val() });
      });
  };
};
