import React, { Component } from "react";
import {
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  LayoutAnimation,
  UIManager,
  Image,
  TextInput,
  ScrollView,
  Alert
} from "react-native";
import _ from 'lodash';


import { connect } from "react-redux";
import { Actions } from "react-native-router-flux";
import { CardSection, Card, Button, Spinner } from "./common";
import { BusinessFetch, AddBusinessToFav, FavoriteBusinessesFetch, RemoveBusinessfromFav, BusinessFetchFav } from "../actions";

class FavBusiness extends Component {
componentWillMount() {

  const { uid } = this.props.business;
  console.log('this.props.initialPosition');
  console.log(uid);
  console.log('this.props.initialPosition');

  this.props.FavoriteBusinessesFetch();
  this.props.BusinessFetchFav({ uid });

}
favButton(){
  if (!(_.isEmpty(this.props.FavFetch))) {
    let i;
    const { restaurant_nameE } = this.props
    for (i = 0; i < this.props.FavFetch.length; i++) {
      if( restaurant_nameE === this.props.FavFetch[i].restaurant_nameE ){
        const uidd = this.props.FavFetch[i].uidd;
        if(this.props.language === 'Arabic'){

        return (
          <TouchableOpacity
            style={{  flex: 1,
              alignSelf: "stretch",
              backgroundColor: "#fff",
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "#007aff",
              marginLeft: 5,
              marginRight: 5}}
            onPress={() => this.check('remove', uidd)}
            >
            <Text style={{ alignSelf: "center",
            color: "#007aff",
            fontSize: 16,
            fontWeight: "600",
            paddingTop: 10,
            paddingBottom: 10 }}>ازل من المفضلة</Text>
          </TouchableOpacity>
        );
      } else {
        return (
          <TouchableOpacity
            style={{  flex: 1,
              alignSelf: "stretch",
              backgroundColor: "#fff",
              borderRadius: 5,
              borderWidth: 1,
              borderColor: "#007aff",
              marginLeft: 5,
              marginRight: 5}}
            onPress={() => this.check('remove', uidd)}
            >
            <Text style={{ alignSelf: "center",
            color: "#007aff",
            fontSize: 16,
            fontWeight: "600",
            paddingTop: 10,
            paddingBottom: 10 }}> Remove from favorite </Text>
          </TouchableOpacity>
        );
      }
      }
    }
  }
  if(this.props.loading){
    return <Spinner size="large" />;
  }
  if(this.props.language === 'Arabic'){

   return (
     <TouchableOpacity
       style={{  flex: 1,
         alignSelf: "stretch",
         backgroundColor: "#fff",
         borderRadius: 5,
         borderWidth: 1,
         borderColor: "#007aff",
         marginLeft: 5,
         marginRight: 5}}
       onPress={() => this.check('fav')}
       >
       <Text style={{ alignSelf: "center",
       color: "#007aff",
       fontSize: 16,
       fontWeight: "600",
       paddingTop: 10,
       paddingBottom: 10 }}> اضف الى المفضلة</Text>
     </TouchableOpacity>
   );
 }
 return (
   <TouchableOpacity
     style={{  flex: 1,
       alignSelf: "stretch",
       backgroundColor: "#fff",
       borderRadius: 5,
       borderWidth: 1,
       borderColor: "#007aff",
       marginLeft: 5,
       marginRight: 5}}
     onPress={() => this.check('fav')}
     >
     <Text style={{ alignSelf: "center",
     color: "#007aff",
     fontSize: 16,
     fontWeight: "600",
     paddingTop: 10,
     paddingBottom: 10 }}> Add to favorite </Text>
   </TouchableOpacity>
 );
}
check(title, uidd) {

  if (this.props.em || this.props.emaillog) {
    if (title === 'write')
     return Actions.reviewForm({ business: this.props.business });
     if(title === 'see')
     return Actions.reviews({ business: this.props.business });
     if(title === 'see2')
     return Actions.Reviews2({ business: this.props.business });
     if(title === 'map')
     if(this.props.em !== '' && this.props.emaillog !== '' && this.props.emaillog !== '' && this.props.em !== undefined)
     return Actions.map({ Markers: [this.props.business] })
     if(title === 'fav') {
       const { uid, category, categoryE, longitude, latitude, restaurant_name, restaurant_nameE, rateing_image, image, description, descriptionE, Contact_information } = this.props.business;
       console.log('ADDTOFAV');
       console.log(uid);
       console.log('ADDTOFAV');

       return this.props.AddBusinessToFav({ uid, category, restaurant_name, restaurant_nameE, rateing_image, image, description, descriptionE, Contact_information, categoryE, longitude, latitude })
     }
     if(title === 'remove') {

       return this.props.RemoveBusinessfromFav({ uid: uidd })
     }
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
)}

}

  render() {

    const { buttonStyle, textStyle, BussinesImageStyle, ViewCardStyle, RatingStyle,
       DescriptionViewStyle, DescriptionTextStyle, ReviewViewStyle } = styles;
    const { category, categoryE, restaurant_name, restaurant_nameE, rateing_image, image, description, descriptionE, Contact_information, uid } = this.props;
console.log(descriptionE);
    if (this.props.language === 'Arabic'){
    return (
      <ScrollView>
        <Card>

          <View style={ViewCardStyle}>
            <Image
              style={BussinesImageStyle}
              source={{ uri:image  }} />
          </View>

          <View style={ViewCardStyle}>
            <Image
              style={RatingStyle}
              source={{uri:rateing_image}}
            />
          </View>

          <CardSection>
            <Text> الوصف: </Text>
          </CardSection>


          <CardSection>
                      <View style={DescriptionViewStyle}>
                        <Text style={DescriptionTextStyle}>
                          {description}
                        </Text>
                      </View>
                    </CardSection>

          <CardSection>
            <Text> معلومات جهة الاتصال: { Contact_information }</Text>
          </CardSection>

          <CardSection>
            <TouchableOpacity
              style={buttonStyle}
              onPress={() => this.check('map')}
              >
              <Text style={textStyle}> المتجر على الخريطة </Text>
            </TouchableOpacity>
          </CardSection>

          <CardSection>
            <TouchableOpacity
              style={buttonStyle}
              onPress={() => this.check('write')}
              >
              <Text style={textStyle}> اكتب مراجعه </Text>
            </TouchableOpacity>
          </CardSection>

          <CardSection>
          {this.favButton()}

          </CardSection>

          <CardSection>
            <TouchableOpacity
              style={buttonStyle}
              onPress={() => this.check('see')}
              >
              <Text style={textStyle}> اراء المستخدمين اللتي تمت مراجعتها </Text>
            </TouchableOpacity>
          </CardSection>

          <CardSection>
            <TouchableOpacity
              style={buttonStyle}
              onPress={() => this.check('see2')}
              >
              <Text style={textStyle}> اراء المستخدمين اللتي جاري مراجعتها </Text>
            </TouchableOpacity>
          </CardSection>
        </Card>
        <View style={{ marginBottom: 100 }} />

      </ScrollView>
    );
  }
  return (
    <ScrollView>
      <Card>

        <View style={ViewCardStyle}>
          <Image
            style={BussinesImageStyle}
            source={{ uri:image  }} />
        </View>

        <View style={ViewCardStyle}>
          <Image
            style={RatingStyle}
            source={{uri:rateing_image}}
          />
        </View>

        <CardSection>
          <Text>Description: </Text>
        </CardSection>


        <CardSection>
                    <View style={DescriptionViewStyle}>
                      <Text style={DescriptionTextStyle}>
                        {description}
                      </Text>
                    </View>
                  </CardSection>

        <CardSection>
          <Text> Contact information: { Contact_information }</Text>
        </CardSection>

        <CardSection>
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => this.check('map')}
            >
            <Text style={textStyle}> View on map </Text>
          </TouchableOpacity>
        </CardSection>

        <CardSection>
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => this.check('write')}
            >
            <Text style={textStyle}> Write review </Text>
          </TouchableOpacity>
        </CardSection>

        <CardSection>
        {this.favButton()}

        </CardSection>

        <CardSection>
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => this.check('see')}
            >
            <Text style={textStyle}>  Filtered reviews    </Text>
          </TouchableOpacity>
        </CardSection>

        <CardSection>
          <TouchableOpacity
            style={buttonStyle}
            onPress={() => this.check('see2')}
            >
            <Text style={textStyle}> Non filtered reviews </Text>
          </TouchableOpacity>
        </CardSection>
      </Card>
      <View style={{ marginBottom: 100 }} />

    </ScrollView>

  );
  }
}

const styles = {
  textStyle: {
    alignSelf: "center",
    color: "#007aff",
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10
  },
  BussinesImageStyle: {
    resizeMode: 'contain',
    width: 300,
    height: 100
  },
  RatingStyle:{
    width: 150,
    height: 20,
    paddingLeft: 5
  },
  ViewCardStyle:{
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "#e6f3ff",
    justifyContent: "center",
    flexDirection: "row",
    borderColor: "#ddd",
    postion: "relative"

  },
  DescriptionViewStyle:{
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5
  },
  DescriptionTextStyle:{
    width: 250,
    textAlign: 'right'
  },
  ReviewViewStyle:
  {
    marginTop: 10,
    marginBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff",
    marginLeft: 5,
    marginRight: 5
  }
};
const MapStateTpProps = (state, props) => {
  const em = state.auth.email;
  const emaillog = state.auth.emaillog;
  const language = state.language.Language;
  const loading = state.favorite.loading;
  const { category, restaurant_name, restaurant_nameE, rateing_image, image, description, descriptionE, Contact_information, uid } = state.fetchfavbusiness;
const Marker = state.fetchfavbusiness;
const FavFetch = _.map(state.favoriteBusinesses, (val, uidd) => {
  return { ...val, uidd };
});
console.log('FavFetch');
console.log(FavFetch);
console.log('FavFetch');

  return { restaurant_nameE, Marker, descriptionE, language, emaillog, category, restaurant_name, rateing_image, image, description, Contact_information, uid, em, loading, FavFetch };
};


export default connect(MapStateTpProps, { BusinessFetchFav, BusinessFetch, AddBusinessToFav, FavoriteBusinessesFetch, RemoveBusinessfromFav })(FavBusiness);
