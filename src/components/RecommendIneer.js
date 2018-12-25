
import React, {Component} from 'react';
import { Text, View, Image, Linking, ImageBackground, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { FavoriteBusinessesFetch, UserReviewsFetch } from '../actions';
import { Card, CardSection, Button, SubCard } from './common';

class RecommendIneer extends Component {
  componentWillMount(){
    this.props.FavoriteBusinessesFetch();
    this.props.UserReviewsFetch({ uid: '1' })
  }
  check() {
    const business = this.props.business

    if (this.props.em || this.props.emaillog) {
       return Actions.businessInner({ business });
    }
    if (this.props.language === 'Arabic')
    {
    Alert.alert(
      'تنبيه',
      'يجب عليك التسجيل اولا',
      [
        {text: 'التسجيل', onPress: () => Actions.Auth() },
        {text: 'الغاء', style: 'cancel'}
      ],
      { cancelable: false }
    )
  } else {
  Alert.alert(
    'Alert',
    'you have to register first',
    [
      {text: 'Register', onPress: () => Actions.Auth() },
      {text: 'cancel', style: 'cancel'}
    ],
    { cancelable: false }
  )
}
  }
  render(){
  const { category, categoryE, restaurant_name, restaurant_nameE, rateing_image, image, total_rates, number_of_rates  } = this.props.business;
const business = this.props.business

  const {
    thumbnailStyle,
    headerContentStyle,
    thumbnailContainerStyle,
    headerTextStyle,
    imageStyle,
    ratingStyle
  } = styles;
  let i;
  let j;
  let found = false;


  for (i = 0; i < this.props.FavFetch.length; i++) {
    found = false;
    if(this.props.FavFetch[i].categoryE === categoryE) {
      for (j = 0; j < this.props.Reviewss.length; j++) {
          if(this.props.business.restaurant_nameE === this.props.Reviewss[j].restaurant_nameE ){

            found = true;
            break;


      }
      }
      for (j = 0; j < this.props.FavFetch.length; j++) {
        if(this.props.business.restaurant_nameE === this.props.FavFetch[j].restaurant_nameE ){
          found = true;
          break;
        }
}
const int_number_of_rates = parseInt(number_of_rates, 10);
const int_total_rates = parseInt(total_rates, 10);
let avg;
if(int_number_of_rates > 0){
     avg = int_total_rates/int_number_of_rates;
  } else {
    avg =0;
  }
    console.log(int_number_of_rates);

    if(avg <= 2){
      found = true;
    }
      if(!found) {
        if (this.props.language === 'Arabic'){

        return (
      <View>
          <Card>
          <TouchableOpacity onPress={() => this.check()}>
            <CardSection justi={'center'}>
              <ImageBackground style={imageStyle} source={{ uri: image }}>
                <View style={styles.innerFrame}>
                    <Text size={18} style={styles.Name}>
                      {restaurant_name}
                    </Text>
                    <Text size={18} style={styles.Type}>
                      {category}
                    </Text>
                </View>
              </ImageBackground>
            </CardSection>

            <SubCard justi={'center'}>
                <Image style={ratingStyle} source={{ uri: rateing_image}}></Image>
            </SubCard>
            </TouchableOpacity>

          </Card>
          </View>

        );
      }
      return (
        <View>
            <Card>
            <TouchableOpacity onPress={() => this.check()}>
              <CardSection justi={'center'}>
                <ImageBackground style={imageStyle} source={{ uri: image }}>
                  <View style={{flex: 1,
                  alignItems: 'flex-start',
                  justifyContent: 'flex-end',
                  backgroundColor: 'rgba(0, 0, 0, .5)'}}>
                      <Text size={18} style={{
                          color: '#fff',
                          opacity: 1,
                          fontSize: 24,
                          fontWeight: '500',
                          paddingLeft: 5
                      }}>
                        { restaurant_nameE }
                      </Text>
                      <Text size={18} style={{
                          color: '#fff',
                          opacity: 1,
                          fontSize: 24,
                          fontWeight: '500',
                          paddingLeft: 5
                      }}>
                        {categoryE}
                      </Text>
                  </View>
                </ImageBackground>
              </CardSection>

              <SubCard justi={'center'}>
                  <Image style={ratingStyle} source={{ uri: rateing_image}}></Image>
              </SubCard>
              </TouchableOpacity>

            </Card>
            </View>
      )
        }
      }
    }
    return <View/>

}
};

const styles = {

  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },

  innerFrame: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, .5)',
  },

  universityImage: {
    width: 300,
    height: 250,
    borderRadius: 5,
  },

  Name: {
      color: '#fff',
      opacity: 1,
      fontSize: 24,
      fontWeight: '500',
      paddingRight: 5
  },
  Type: {
      color: '#fff',
      opacity: 1,
      fontSize: 24,
      fontWeight: '500',
      paddingRight: 5

  },

  universityMotto: {
        color: '#fff',
        opacity: .9,
        textAlign: 'center',
        backgroundColor: 'transparent'
  },

  headerTextStyle: {
        fontSize: 18
  },

  thumbnailStyle: {
        height: 50,
        width: 50
  },

  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },

   paragraph: {
    fontSize: 30,
    fontWeight: 'bold',
    alignSelf:'flex-end',
    bottom: -160,
    color: 'white',
    backgroundColor: 'transparent',
  },
  ratingStyle: {
    height: 30,
    width: 150,
    resizeMode: 'contain',
  },
  imageStyle: {
    height: 200,
    width: null,
    flex: 1,
    resizeMode: 'contain',
  }
};
const MapStateTpProps = state => {
const language = state.language.Language;
const em = state.auth.email;
const emaillog = state.auth.emaillog;
const FavFetch = _.map(state.favoriteBusinesses, (val, uidd) => {
  return { ...val, uidd };
});
const Reviewss = _.map(state.userReview, (val, uid) => {
  return { ...val, uid };
});
return ({ language, em, emaillog, FavFetch, Reviewss });
};
export default connect(MapStateTpProps, { FavoriteBusinessesFetch, UserReviewsFetch })(RecommendIneer);
