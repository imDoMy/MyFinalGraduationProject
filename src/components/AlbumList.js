import React, { Component } from 'react';
import { ListView, Text, View,ScrollView, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import AlbumDetail from './AlbumDetail';
import { BusinessesFetch, UserFetchInfo, CreateUser } from '../actions';
import { CardSection, Card, Spinner } from './common';


class AlbumList extends Component {

  componentWillMount() {
      this.props.BusinessesFetch();
      this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
      // nextProps are the next set of props that this component
      // will be rendered with
      // this.props is still the old set of props

      this.createDataSource(nextProps);
    }


    createDataSource({ businesses }) {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });

      this.dataSource = ds.cloneWithRows(businesses);
  }
  renderRow(business) {
      return (

        <AlbumDetail business={business} />

      );
  }

  check(title) {

    if (this.props.em || this.props.emaillog) {
      if (title === 'map')
       return Actions.map({ Markers: this.props.businesses });
       return Actions.search({ Markers: this.props.businesses })
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

  renderButton() {

    if (!(_.isEmpty(this.props.businesses))) {
      if (this.props.language === 'Arabic')
      {
      return (
        <View>
      <CardSection>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => this.check('map')}
      >
        <Text style={styles.textStyle}>
        اضغط هنا لرؤية المتاجر على الخريطة

        </Text>
      </TouchableOpacity>
      </CardSection>


      <CardSection>
      <TouchableOpacity
        style={styles.buttonStyle}
        onPress={() => this.check('search')}
      >
        <Text style={styles.textStyle}>
اضغط هنا للبحث عن متجر
        </Text>
      </TouchableOpacity>
      </CardSection>
      </View>

    );
  }
  return (
    <View>
  <CardSection>
  <TouchableOpacity
    style={styles.buttonStyle}
    onPress={() => this.check('map')}
  >
    <Text style={styles.textStyle}>
View all businesses
    </Text>
  </TouchableOpacity>
  </CardSection>


  <CardSection>
  <TouchableOpacity
    style={styles.buttonStyle}
    onPress={() => this.check('search')}
  >
    <Text style={styles.textStyle}>
    search for business
    </Text>
  </TouchableOpacity>
  </CardSection>
  </View>
);
  }
  return <Spinner size="large" style={{ marginTop: 200 }} />;
  }

// renderBusinesses() {
//   return this.props.libraries.map(lib =>
//     <AlbumDetail key={lib.Id} record={lib} />
//   );
// }

  render() {
    return (
      <ScrollView>
      <View>

{ this.renderButton()
}
  <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
  />
  </View>
      </ScrollView>

);
}
}

const MapStateTpProps = state => {
  const em = state.auth.email;
  const emaillog = state.auth.emaillog;
  const language = state.language.Language;
  const fullname = state.auth.fullname;

if (state.auth.email) {

     const email = state.auth.email;
     const businesses = _.map(state.businesses, (val, uid) => {
       return { ...val, uid };
   });
     return { businesses, email, em, emaillog, language, fullname };
   }

  const businesses = _.map(state.businesses, (val, uid) => {
    return { ...val, uid };
});
  return { businesses, em, emaillog, language, fullname };
};

const styles = {
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
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  }
};
export default connect(MapStateTpProps, { BusinessesFetch, UserFetchInfo, CreateUser })(AlbumList);
