import React, { Component } from 'react';
import {
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
  View,
  LayoutAnimation,
  UIManager,
  Image,
  TextInput,
  ScrollView
} from 'react-native';
import { connect } from 'react-redux';
import { CardSection, Card, Button } from './common';
import * as actions from '../actions';


  class ShowUserReview extends Component  {
       Language(){
         const { UserName, UserComment, rateing_image, restaurant_name, restaurant_nameE, date, month, year  } = this.props.Reviewss;
         const {ViewReviewStyle, RatingImageStyle, ReviewStyle, ReviewBody} = styles
  	if (this.props.language === 'Arabic'){
      return(
        <Card style={{ flex: 1 }}>
        <CardSection>
          <Text style={{ paddingRight: 5}}> اسم المتجر : {restaurant_name}  </Text>
        </CardSection>
          <CardSection>
            <Text style={{ paddingRight: 5}}>  التاريخ : {date}-{month}-{year} </Text>
          </CardSection>

          <CardSection style={ReviewStyle}>
            <Text> التقييم: </Text>
          </CardSection>

          <CardSection style={ReviewBody}>
            <Text style={{ width: 250, textAlign: "right" }}>
              {UserComment}

            </Text>


          </CardSection>
          <CardSection>
          <Image
            style={RatingImageStyle}
            source={{uri:rateing_image}}
          />
          </CardSection>
        </Card>
      );
    }
      return(
        <Card style={{ flex: 1 }}>
        <CardSection style={{justifyContent: 'flex-end'}}>
          <Text style={{ paddingRight: 5}}> Business name : {restaurant_nameE}  </Text>
        </CardSection>

          <CardSection style={{justifyContent: 'flex-end'}}>
            <Text style={{ paddingRight: 5}}> Date : {date}-{month}-{year}  </Text>
          </CardSection>

          <CardSection style={{ReviewStyle, justifyContent: 'flex-end'}}>
            <Text> Review: </Text>
          </CardSection>

          <CardSection style={{ReviewBody, justifyContent: 'flex-end'}}>
            <Text style={{ width: 250, textAlign: "left"}}>
              {UserComment}

            </Text>


          </CardSection>
          <CardSection style={{justifyContent: 'flex-end'}}>
          <Image
            style={RatingImageStyle}
            source={{uri:rateing_image}}
          />
          </CardSection>
        </Card>
      );

    }
  render(){

    return (
    this.Language()
      );
    }
    }


const styles = {
  ViewReviewStyle:
  {
    borderBottomWidth: 1,
    padding: 5,
    backgroundColor: "#E0F8F8",
    justifyContent: "space-between",
    flexDirection: "row",
    borderColor: "#ddd",
    postion: "relative"
  },
  RatingImageStyle:
  {
    width: 150,
    height: 20,
    // paddingLeft: 5,
    // marginBottom: 100
  },

  ReviewStyle:{
    padding: 5,
    backgroundColor: "#e6f3ff",
    borderColor: "#ddd",
    postion: "relative",
    flexDirection: "row",
    justifyContent: "flex-end"
  },
  ReviewBody:{
    paddingTop: 10,
    paddingBottom: 10,
    paddingRight: 60,
    backgroundColor: "#e6f3ff",
    borderColor: "#ddd",
    postion: "relative",
    flexDirection: "row",
    justifyContent: "flex-end"
  }
};
const MapStateTpProps = state => {
const language = state.language.Language;
return ({ language });
};
export default connect(MapStateTpProps)(ShowUserReview);
