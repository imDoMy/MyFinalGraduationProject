import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';

export const BusinessesFetch = () => {
  return (dispatch) => {
    firebase.database().ref('/Businesses')
      .on('value', snapshot => {
        dispatch({ type: 'BUSINESSES_FETCH_SUCCESS', payload: snapshot.val() });
      });
  };
};

export const BusinessFetch = ({ uid }) => {
  return (dispatch) => {
    firebase.database().ref(`/Businesses/${uid}`)
      .on('value', snapshot => {
        dispatch({ type: 'BUSINESS_FETCH_SUCCESS', payload: snapshot.val() });
      });
  };
};

export const Feedback = ({ text }) => {
const textBox = text;
const { currentUser } = firebase.auth();

const uid = currentUser.uid;
  return (dispatch) => {
    firebase.database().ref('/Feedback')
      .push({ textBox, uid })
      .then(() => {
        dispatch({ type: 'NON' })
Actions.pop();
    });
  };
};

export const BusinessFetchFav = ({ uid }) => {
  return (dispatch) => {
    firebase.database().ref(`/Businesses/${uid}`)
      .on('value', snapshot => {
        dispatch({ type: 'BUSINESSFAV_FETCH_SUCCESS', payload: snapshot.val() });
      });
  };
};

export const BusinessUpdate = ({ uid, total_rates, number_of_rates, rateing_image }) => {
  return () => {
    firebase.database().ref(`/Businesses/${uid}`)
      .update({ total_rates, number_of_rates, rateing_image })
      .then(() => {
        Actions.pop();
      });
  };
};


export const BusinessUpdateSec2 = ({ uid, total_rates1, number_of_rates1 }) => {
  return () => {
    firebase.database().ref(`/Businesses/${uid}`)
      .update({ total_rates1, number_of_rates1 })
      .then(() => {
        Actions.pop();
      });
  };
};

export const BusinessUpdate2 = ({ uid }) => {
  return () => {
    firebase.database().ref(`/Businesses/${uid}`)
      .update({ total_rates1: 0, number_of_rates1: 0 })
  };
};

export const AddBusinessToFav = ({ uid, category, restaurant_name, restaurant_nameE, rateing_image, image, description, descriptionE, Contact_information, categoryE, longitude, latitude }) => {

 const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: 'ADDING' });

    firebase.database().ref(`/Users/${currentUser.uid}/Favorite`)
      .push({ uid, category, restaurant_name, restaurant_nameE, rateing_image, image, description, descriptionE, Contact_information, categoryE, longitude, latitude })
      .then(() => {
      dispatch({ type: 'ADD_FAV' });
    });
  };
};

export const RemoveBusinessfromFav = ({ uid }) => {


 const { currentUser } = firebase.auth();

  return (dispatch) => {
    dispatch({ type: 'ADDING' });
    firebase.database().ref(`/Users/${currentUser.uid}/Favorite/${uid}`)
      .remove()
      .then(() => {
      dispatch({ type: 'REMOVE_FAV' });
    });
  };
};

export const FavoriteBusinessesFetch = () => {
  const { currentUser } = firebase.auth();
if (currentUser) {
  return (dispatch) => {
    firebase.database().ref(`/Users/${currentUser.uid}/Favorite`)
      .on('value', snapshot => {
        dispatch({ type: 'FAVORITE_BUSINESSES_FETCH_SUCCESS', payload: snapshot.val() });
      });

  };
}
return (dispatch) => {
  dispatch({ type: 'REVIEW_CREATE' });
};
};
