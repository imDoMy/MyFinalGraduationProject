import React, { Component } from 'react';
import { ListView, Text, View,ScrollView, TouchableOpacity, Alert } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import FetchFavoriteBusinesses from './FetchFavoriteBusinesses';
import { FavoriteBusinessesFetch } from '../actions';
import { CardSection, Card, Spinner } from './common';


class FavoriteList extends Component {

  componentWillMount() {
      this.props.FavoriteBusinessesFetch();
      this.createDataSource(this.props);
    }

    componentWillReceiveProps(nextProps) {
      // nextProps are the next set of props that this component
      // will be rendered with
      // this.props is still the old set of props

      this.createDataSource(nextProps);
    }

    createDataSource({ FavFetch }) {
      const ds = new ListView.DataSource({
        rowHasChanged: (r1, r2) => r1 !== r2
      });

      this.dataSource = ds.cloneWithRows(FavFetch);
  }
  renderRow(business) {
    // console.log('this.props.loading');
    // console.log(this.props.loading);
    // console.log('this.props.loading');

      return (

        <FetchFavoriteBusinesses business={business} />

      );
  }


  render() {
    return (
      <ScrollView>

  <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
  />
      </ScrollView>

);
}
}

const MapStateTpProps = state => {


  const FavFetch = _.map(state.favoriteBusinesses, (val, uidd) => {
    return { ...val, uidd };
  });


  return { FavFetch };
};

export default connect(MapStateTpProps, { FavoriteBusinessesFetch })(FavoriteList);
