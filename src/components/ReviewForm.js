import React, { Component } from 'react';
import { View, Text, Picker, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import _ from 'lodash';
import { BusinessUpdateSec2, WriteReview, reviewUpdate, BusinessFetch, BusinessUpdate, UserFetchInfo, WriteReviewSec2, ReviewsFetchSec2, TransReviewSec2, BusinessUpdate2, UserReviewsFetch } from '../actions';
import { CardSection, Input, TextInputt, Card } from './common';


class ReviewForm extends Component {
  componentWillMount() {
    // here i took the uid of the business so i can fetch the data
    this.props.UserFetchInfo();
    const { uid } = this.props.business;
    this.props.ReviewsFetchSec2({ uid });
    this.props.UserReviewsFetch({ uid: '1' });

  //here we fetch the business data every time we render this component
  // so we can get the newest total_rates and number_of_rates
    this.props.BusinessFetch({ uid });
  }

language(){
  if (this.props.em || this.props.emaillog ) {
  if (this.props.language === 'Arabic') {
    return (
      <View>
        <CardSection>
          <TextInputt
            label="تعليق المستخدم"
            placeholder="اكتب مراجعتك هنا"
            value={this.props.UserComment}
            onChangeText={value => this.props.reviewUpdate({ prop: 'UserComment', value })}
          />
        </CardSection>

        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerTextStyle}>التقييم:</Text>
          </CardSection>

          <CardSection style={{ marginLeft: 5, marginRight: 5, color: 'white' }}>
          <Picker
            style={{ flex: 1, height: 44 }}
            itemStyle={{ height: 44, borderWidth: 1 }}
            selectedValue={this.props.rate}
            onValueChange={value => this.props.reviewUpdate({ prop: 'rate', value })}
          >
            <Picker.Item label="5" value="5" />
            <Picker.Item label="4" value="4" />
            <Picker.Item label="3" value="3" />
            <Picker.Item label="2" value="2" />
            <Picker.Item label="1" value="1" />
          </Picker>
        </CardSection>

        <CardSection>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={this.onButtonPress.bind(this)}
          >
          <Text style={styles.textStyle}> اضغط هنا لإرسال مراجعتك </Text>
        </TouchableOpacity>
</CardSection>
      </View>
    );
}
return (
<View>
  <CardSection>
    <Input
      label="Review"
      placeholder="write your review here"
      value={this.props.UserComment}
      onChangeText={value => this.props.reviewUpdate({ prop: 'UserComment', value })}
    />
  </CardSection>

  <CardSection style={{ flexDirection: 'column' }}>
    <Text style={styles.pickerTextStyle}>Rate:</Text>
    </CardSection>

    <CardSection style={{ marginLeft: 5, marginRight: 5, color: 'white' }}>
    <Picker
      style={{ flex: 1, height: 44 }}
      itemStyle={{ height: 44, borderWidth: 1 }}
      selectedValue={this.props.rate}
      onValueChange={value => this.props.reviewUpdate({ prop: 'rate', value })}
    >
      <Picker.Item label="5" value="5" />
      <Picker.Item label="4" value="4" />
      <Picker.Item label="3" value="3" />
      <Picker.Item label="2" value="2" />
      <Picker.Item label="1" value="1" />
    </Picker>
  </CardSection>

  <CardSection>
  <TouchableOpacity
    style={styles.buttonStyle}
    onPress={this.onButtonPress.bind(this)}
    >
    <Text style={styles.textStyle}>send review </Text>
  </TouchableOpacity>
</CardSection>
</View>
);
}
if (this.props.language === 'Arabic'){
return (
<Card style={{ flex: 1 }}>
<CardSection>
<Text style={{ alignSelf: "center",
color: "red",
fontSize: 16,
fontWeight: "600",
paddingTop: 10,
paddingBottom: 10,
}}>
انت غير مسجل ، يجب عليك التسجيل اولا
</Text>
</CardSection>

  <CardSection>
  <TouchableOpacity
    style={{flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5}}
    onPress={() => Actions.Auth()}

  >
    <Text style={{ alignSelf: "center",
    color: "#007aff",
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10}}>
للتسجيل اضغط هنا
    </Text>
  </TouchableOpacity>
  </CardSection>
</Card>
);
} else {
return (
<Card style={{ flex: 1 }}>
<CardSection>
<Text style={{ alignSelf: "center",
color: "red",
fontSize: 16,
fontWeight: "600",
paddingTop: 10,
paddingBottom: 10,
}}>
you are not register, you have to register first
</Text>
</CardSection>

  <CardSection>
  <TouchableOpacity
    style={{flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5}}
    onPress={() => Actions.Auth()}

  >
    <Text style={{ alignSelf: "center",
    color: "#007aff",
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10}}>
Register
    </Text>
  </TouchableOpacity>
  </CardSection>
</Card>
);
}
}



  onButtonPress() {

    if (this.props.em !== '' || this.props.em !== undefined || this.props.emaillog !== '' || this.props.emaillog !== undefined ) {
      let date = new Date().getDate();
      let month = new Date().getMonth() + 1;
      let year = new Date().getFullYear();
      this.props.UserReviewsFetch({ uid: '1' });
console.log(this.props.ownReviews);
      if (!(_.isEmpty(this.props.ownReviews))) {

        let i;
        for (i = 0; i < this.props.ownReviews.length; i++ ){
          if(this.props.ownReviews[i].restaurant_nameE === this.props.restaurant_nameE){
            if(this.props.ownReviews[i].year === year && this.props.ownReviews[i].month === month && this.props.ownReviews[i].date === date ){
              if (this.props.language === 'Arabic')
              {
              Alert.alert(
                'تنبيه',
                ' لا يمكنك كتابة اكثر من مراجعه لنفس المتجر في يوم واحد',
                [
                  {text: 'الغاء', style: 'cancel'}
                ],
                { cancelable: false }
              )
              } else {
              Alert.alert(
              'Alert',
              'you cant write more than one review to the same business in one day ',
              [
                {text: 'cancel', style: 'cancel'}
              ],
              { cancelable: false }
              )}
              this.props.UserReviewsFetch({ uid: '1' });
return;
            }
          }
        }
      }


  const { UserComment, rate, total_rates, number_of_rates, restaurant_name, restaurant_nameE, total_rates1, number_of_rates1 } = this.props;
  const { fullname } = this.props.Info;
  const { uid } = this.props.business;
// here i fecht the data again just to make sure the data is here
this.props.BusinessFetch({ uid });

// here i creat a variable rateing_image to save the rating image in it
   var rateing_image;

//here im cheking the rate so i can give the review same rate as the user picked
  if (rate === '1') {
    rateing_image = 'https://i.postimg.cc/0KG3ynvz/1.png';
  }
  else if (rate === '2') {
    rateing_image = 'https://i.postimg.cc/yJwrhtYJ/2.png';
  }
  else if (rate === '3') {
    rateing_image = 'https://i.postimg.cc/BtGJ4wcQ/3.png';
  }
  else if (rate === '4') {
    rateing_image = 'https://i.postimg.cc/kBTCNMrB/4.png';
  }
  else if (rate === 'undefined' || '5') {
    rateing_image = 'https://i.postimg.cc/p5BGHdQ8/5.png';
  }
// here i creat this variable in case the user didnt move the picker
// if the user didnt move the picker ill make the new rate 5 as the default
  var protected_rate;
  if (rate === '1' || rate === '2' || rate === '3' || rate === '4' || rate === '5') {
  protected_rate = rate;
  } else {
    protected_rate = '5';

  }

// here all the calculation and casting for evaluate the new rate for the business
  const new_rate = parseInt(protected_rate, 10);
  const int_total_rates = parseInt(total_rates, 10);
  const int_number_of_rates = parseInt(number_of_rates, 10);
  const new_int_number_of_rates = int_number_of_rates + 1;
  const new_int_total_rates = int_total_rates + new_rate;
  const  oldAvg = int_total_rates/int_number_of_rates;
  const avg = new_int_total_rates/new_int_number_of_rates;
  const new_string_number_of_rates = new_int_number_of_rates.toString();
  const new_string_total_rates = new_int_total_rates.toString();
  var rateing_image1;
  if(int_number_of_rates === 0){
    if (avg > 0 && avg <= 1) {
      rateing_image1 = 'https://i.postimg.cc/0KG3ynvz/1.png';
    }
    else if (avg > 1 && avg <= 2) {
      rateing_image1 = 'https://i.postimg.cc/yJwrhtYJ/2.png';
    }
    else if (avg > 2 && avg <= 3) {
      rateing_image1 = 'https://i.postimg.cc/BtGJ4wcQ/3.png';
    }
    else if (avg > 3 && avg <= 4) {
      rateing_image1 = 'https://i.postimg.cc/kBTCNMrB/4.png';
    }
    else if (avg > 4 && avg <= 5) {
      rateing_image1 = 'https://i.postimg.cc/p5BGHdQ8/5.png';
    }
    this.props.BusinessUpdate({ uid, total_rates: new_string_total_rates, number_of_rates: new_string_number_of_rates, rateing_image: rateing_image1 })
    // here im saving the review in the business and the user's Reviews
      this.props.WriteReview({ restaurant_name, restaurant_nameE, UserComment, uid, UserName: fullname, rateing_image, rate: rate || '5', date, month, year  });
return;
}

  const diffSec1 = Math.abs(oldAvg - avg);
if (diffSec1 < 1) {
  if (avg > 0 && avg <= 1) {
    rateing_image1 = 'https://i.postimg.cc/0KG3ynvz/1.png';
  }
  else if (avg > 1 && avg <= 2) {
    rateing_image1 = 'https://i.postimg.cc/yJwrhtYJ/2.png';
  }
  else if (avg > 2 && avg <= 3) {
    rateing_image1 = 'https://i.postimg.cc/BtGJ4wcQ/3.png';
  }
  else if (avg > 3 && avg <= 4) {
    rateing_image1 = 'https://i.postimg.cc/kBTCNMrB/4.png';
  }
  else if (avg > 4 && avg <= 5) {
    rateing_image1 = 'https://i.postimg.cc/p5BGHdQ8/5.png';
  }
  this.props.BusinessUpdate({ uid, total_rates: new_string_total_rates, number_of_rates: new_string_number_of_rates, rateing_image: rateing_image1 })
  // here im saving the review in the business and the user's Reviews
    this.props.WriteReview({ restaurant_name, restaurant_nameE, UserComment, uid, UserName: fullname, rateing_image, rate: rate || '5', date, month, year });

} else {
  const sec2_Total_Rate = total_rates1 ;
  const sec2_number_of_rates =   number_of_rates1 ;
  const sec2OldAvg = sec2_Total_Rate/sec2_number_of_rates;
  const new_sec2_Total_Rate = total_rates1 + new_rate;
  const new_sec2_number_of_rates = number_of_rates1 + 1 ;
  const sec2Avg = new_sec2_Total_Rate/new_sec2_number_of_rates;
  const diffSec2 = Math.abs(sec2OldAvg - sec2Avg);
  if(sec2_number_of_rates === 0) {

  this.props.WriteReviewSec2({ restaurant_name, restaurant_nameE, UserComment, uid, UserName: fullname, rateing_image, rate: rate || '5', date, month, year });

  this.props.BusinessUpdateSec2({ uid, total_rates1: new_sec2_Total_Rate, number_of_rates1: new_sec2_number_of_rates })
  return;
} else {
  if(diffSec2 >= 1) {
    this.props.WriteReviewSec2({ restaurant_name, restaurant_nameE, UserComment, uid, UserName: fullname, rateing_image, rate: rate || '5', date, month, year });

    this.props.BusinessUpdateSec2({ uid, total_rates1: new_sec2_Total_Rate, number_of_rates1: new_sec2_number_of_rates })
  } else {

    const total_rate_sec1 = int_total_rates + new_rate ;
    const number_of_rates_sec1 = int_number_of_rates + 1 ;
    const total_rate_sec2 = sec2_Total_Rate;
    const number_of_rates_sec2 = sec2_number_of_rates ;
    const sec1_sec2_total_rate = total_rate_sec1 + total_rate_sec2;
    const sec1_sec2_number_of_rates = number_of_rates_sec1 + number_of_rates_sec2;
    const sec1_sec2_avg = sec1_sec2_total_rate/sec1_sec2_number_of_rates;
    const String_sec1_sec2_total_rate = sec1_sec2_total_rate.toString();
    const Strinf_sec1_sec2_number_of_rates = sec1_sec2_number_of_rates.toString();
console.log('sec1_sec2_avg');
console.log(sec1_sec2_avg);
console.log('sec1_sec2_avg');

    if (sec1_sec2_avg > 0 && sec1_sec2_avg <= 1) {
      rateing_image1 = 'https://i.postimg.cc/0KG3ynvz/1.png';
    }
    else if (sec1_sec2_avg > 1 && sec1_sec2_avg <= 2) {
      rateing_image1 = 'https://i.postimg.cc/yJwrhtYJ/2.png';
    }
    else if (sec1_sec2_avg > 2 && sec1_sec2_avg <= 3) {
      rateing_image1 = 'https://i.postimg.cc/BtGJ4wcQ/3.png';
    }
    else if (sec1_sec2_avg > 3 && sec1_sec2_avg <= 4) {
      rateing_image1 = 'https://i.postimg.cc/kBTCNMrB/4.png';
    }
    else if (sec1_sec2_avg > 4 && sec1_sec2_avg <= 5) {
      rateing_image1 = 'https://i.postimg.cc/p5BGHdQ8/5.png';
    }
    let i;
    const reviews = this.props.Reviewss;
let transUsername;
let transUsercomment;
let transRate;
let transImage;
let ruid;
let datee;
let monthh;
let yearr;

for(i = 0; i < reviews.length; i++) {
  transUsername = reviews[i].UserName;
  transUsercomment = reviews[i].UserComment;
  transRate = reviews[i].rate;
  transImage = reviews[i].rateing_image;
  ruid = reviews[i].uid;
  monthh = reviews[i].month;
  datee = reviews[i].date;
  yearr = reviews[i].year;
  this.props.TransReviewSec2({ UserName: transUsername, UserComment: transUsercomment, rate: transRate, rateing_image: transImage, uid: this.props.business.uid, ruid, date: datee, month: monthh, year: yearr })
}
this.props.BusinessUpdate2({ uid });
this.props.WriteReview({ restaurant_name, restaurant_nameE, UserComment, uid, UserName: fullname, rateing_image, rate: rate || '5', date, month, year });

this.props.BusinessUpdate({ uid, total_rates: String_sec1_sec2_total_rate, number_of_rates: Strinf_sec1_sec2_number_of_rates, rateing_image: rateing_image1 })

  }
}
}

  //here im cheking the avarage so i can give the business new rate

// here im updating the business rate

} else {
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
}


  render() {
    return (
      this.language()
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 20,
  },
  textStyle: {
    alignSelf: "center",
    color: "#007aff",
    fontSize: 16,
    fontWeight: "600",
    paddingTop: 10,
    paddingBottom: 10
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

const mapStateToProps = (state) => {
  const em = state.auth.email;
  const emaillog = state.auth.emaillog;
  const { UserComment, rate } = state.reviewForm;
  const Reviewss = _.map(state.reviews2, (val, uid) => {
    return { ...val, uid };
});
const ownReviews = _.map(state.userReview, (val, uid) => {
  return { ...val, uid };
});
  const { total_rates, number_of_rates, restaurant_name, restaurant_nameE, total_rates1, number_of_rates1  } = state.business;
  const language = state.language.Language;
  const Info = state.userInfo;

  return { em, emaillog, ownReviews, Reviewss, language, UserComment, rate, total_rates, number_of_rates, Info, restaurant_name, restaurant_nameE, total_rates1, number_of_rates1 };
};

export default connect(mapStateToProps, { WriteReview, reviewUpdate, BusinessFetch, BusinessUpdate, UserFetchInfo, WriteReviewSec2, BusinessUpdateSec2, ReviewsFetchSec2, TransReviewSec2, BusinessUpdate2, UserReviewsFetch })(ReviewForm);
