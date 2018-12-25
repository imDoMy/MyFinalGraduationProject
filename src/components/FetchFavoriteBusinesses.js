import React, { Component } from 'react';
import { Text, View, Image, Linking, ImageBackground, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import AlbumDetail from './AlbumDetail';
import { BusinessFetchFav } from '../actions';
import { Card, CardSection, Button, SubCard } from './common';


class FetchFavoriteBusinesses extends Component {
componentWillMount(){

  const { uid } = this.props.business;
  this.props.BusinessFetchFav({ uid });

}
  render() {
  //   const { category, categoryE, restaurant_name, restaurant_nameE, rateing_image, image } = this.props;
  // const business = this.props.bb
  // console.log('business');
  // console.log(business);
  // console.log('business');
  const { category, categoryE, restaurant_name, restaurant_nameE, image } = this.props.business;
  const { rateing_image } = this.props.business;
const business = this.props.business
console.log('this.props.business');
console.log(this.props.business);
console.log('this.props.business');


    const {
      thumbnailStyle,
      headerContentStyle,
      thumbnailContainerStyle,
      headerTextStyle,
      imageStyle,
      ratingStyle
    } = styles;
    if (this.props.language === 'Arabic'){
    return (
  <View>
      <Card>
      <TouchableOpacity onPress={() => Actions.favinner({ business })}>
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
        <TouchableOpacity onPress={() => Actions.favinner({ business })}>
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

const MapStateTpProps = (state, props) => {
  // const { category, categoryE, restaurant_name, restaurant_nameE, rateing_image, image} = state.fetchfavbusiness;
  const language = state.language.Language;
  const { rateing_image } = state.fetchfavbusiness;
  // let bb = state.fetchfavbusiness
  // bb = { ...bb, uid: props.business.uidd };
  // return { bb, category, categoryE, restaurant_name, restaurant_nameE, rateing_image, image, language };
  return{ language, rateing_image }
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
export default connect(MapStateTpProps, { BusinessFetchFav })(FetchFavoriteBusinesses);
