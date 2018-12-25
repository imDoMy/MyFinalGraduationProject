import React, { Component } from 'react';
import { View, Text, Picker, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { WriteReview, reviewUpdate, BusinessFetch, BusinessUpdate } from '../actions';
import { CardSection, Card, Section, TextInputt, TextInputtE } from './common';


class Search extends Component {

nav(title) {
  if (title === 'name') {
    return Actions.searchbyname({ Markers: this.props.Markers });
  }
    return Actions.searchbycategory({ Markers: this.props.Markers });
}
language() {
  if (this.props.language === 'Arabic') {
    return (
      <View>
        <CardSection>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => this.nav('name')}
        >
          <Text style={styles.textStyle}>البحث عن طريق الاسم</Text>
        </TouchableOpacity>
</CardSection>
<CardSection>
<TouchableOpacity
  style={styles.buttonStyle}
  onPress={() => this.nav('cat')}
>
  <Text style={styles.textStyle}>البحث عن طريق التصنيف</Text>
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
      onPress={() => this.nav('name')}
    >
      <Text style={styles.textStyle}>Search by name</Text>
    </TouchableOpacity>
</CardSection>
<CardSection>
<TouchableOpacity
  style={styles.buttonStyle}
  onPress={() => this.nav('cat')}
>
  <Text style={styles.textStyle}>Search by category</Text>
</TouchableOpacity>
</CardSection>
  </View>
);
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
    paddingLeft: 20
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

const MapStateTpProps = state => {
const language = state.language.Language;
return ({ language });
};
export default connect(MapStateTpProps)(Search);
