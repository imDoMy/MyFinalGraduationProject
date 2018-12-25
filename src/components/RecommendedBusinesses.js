import React, { Component } from 'react';
import { ListView, Text, View,ScrollView, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import AlbumDetail from './AlbumDetail';
import RecommendIneer from './RecommendIneer';
import { BusinessesFetch, UserFetchInfo, CreateUser, FavoriteBusinessesFetch, UserReviewsFetch } from '../actions';
import { CardSection, Card, Spinner } from './common';


class RecommendedBusinesses extends Component {

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
  renderScreen() {
    return (
    <ScrollView>
    <View>
<ListView
      enableEmptySections
      dataSource={this.dataSource}
      renderRow={this.renderRow}
/>
</View>
    </ScrollView>
  )
  }

  renderRow(business) {
  return (

    <RecommendIneer business={business} />

  );
}

  render() {
    return (

this.renderScreen()
);
}
}

const MapStateTpProps = state => {
  const em = state.auth.email;
  const emaillog = state.auth.emaillog;
  const language = state.language.Language;
  const fullname = state.auth.fullname;


   const FavFetch = _.map(state.favoriteBusinesses, (val, uidd) => {
     return { ...val, uidd };
   });
   // console.log('FavFetch');
   // console.log(FavFetch);
   // console.log('FavFetch');

   const Reviewss = _.map(state.userReview, (val, uid) => {
     return { ...val, uid };
 });
  const businesses = _.map(state.businesses, (val, uid) => {
    return { ...val, uid };
});
  return { businesses, em, emaillog, language, fullname, Reviewss, FavFetch };
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
export default connect(MapStateTpProps, { BusinessesFetch, UserFetchInfo, CreateUser, FavoriteBusinessesFetch, UserReviewsFetch })(RecommendedBusinesses);
