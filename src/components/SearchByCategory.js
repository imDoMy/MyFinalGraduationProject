import React, { Component } from 'react';
import { View, Text, Picker, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { WriteReview, reviewUpdate, BusinessFetch, BusinessUpdate } from '../actions';
import { CardSection, Card, Section, TextInputt, TextInputtE } from './common';


class SearchByCategory extends Component {


language() {
  if (this.props.language === 'Arabic') {
    return (
      <View>
      <CardSection style={{ flexDirection: 'column' }}>
        <Text style={styles.pickerTextStyle}>اختر التصنيف</Text>
        </CardSection>

        <CardSection style={{ marginLeft: 5, marginRight: 5, color: 'white' }}>
        <Picker
          style={{ flex: 1, height: 44 }}
          itemStyle={{ height: 44, borderWidth: 1 }}
          selectedValue={this.state.category}
          onValueChange={category => this.setState({ category })}
        >
          <Picker.Item label="اظهر الكل" value="all" />
          <Picker.Item label="مطاعم" value="resturant" />
          <Picker.Item label="فنادق" value="hotel" />
          <Picker.Item label="سوبرماركت" value="supermarket" />
          <Picker.Item label="محطة وقود" value="gas station" />

        </Picker>
      </CardSection>


        <CardSection style={{ flexDirection: 'column' }}>
          <Text style={styles.pickerTextStyle}>مساحة البحث حولك</Text>
          </CardSection>

          <CardSection style={{ marginLeft: 5, marginRight: 5, color: 'white' }}>
          <Picker
            style={{ flex: 1, height: 44 }}
            itemStyle={{ height: 44, borderWidth: 1 }}
            selectedValue={this.state.radius}
            onValueChange={radius => this.setState({ radius })}
          >
            <Picker.Item label="اظهر الكل" value="all" />
            <Picker.Item label="٥ كم" value="5" />
            <Picker.Item label="١٠ كم" value="10" />

          </Picker>
        </CardSection>
        <CardSection>
        <TouchableOpacity
          style={styles.buttonStyle}
          onPress={() => Actions.map({ Markers: this.props.Markers, radius: this.state.radius, category: this.state.category })}
          >
          <Text style={styles.textStyle}> اضغط هنا للبحث </Text>
        </TouchableOpacity>
</CardSection>
      </View>
    );
}
return (
  <View>
  <CardSection style={{ flexDirection: 'column' }}>
    <Text style={styles.pickerTextStyle}> choose the category </Text>
    </CardSection>

    <CardSection style={{ marginLeft: 5, marginRight: 5, color: 'white' }}>
    <Picker
      style={{ flex: 1, height: 44 }}
      itemStyle={{ height: 44, borderWidth: 1 }}
      selectedValue={this.state.category}
      onValueChange={category => this.setState({ category })}
    >
      <Picker.Item label="show all" value="all" />
      <Picker.Item label="resturant" value="resturant" />
      <Picker.Item label="hotel" value="hotel" />
      <Picker.Item label="supermarket" value="supermarket" />
      <Picker.Item label="gas station" value="gas station" />


    </Picker>
  </CardSection>

    <CardSection style={{ flexDirection: 'column' }}>
      <Text style={styles.pickerTextStyle}>search for the radius</Text>
      </CardSection>

      <CardSection style={{ marginLeft: 5, marginRight: 5, color: 'white' }}>
      <Picker
        style={{ flex: 1, height: 44 }}
        itemStyle={{ height: 44, borderWidth: 1 }}
        selectedValue={this.state.radius}
        onValueChange={radius => this.setState({ radius })}
      >
        <Picker.Item label="show all" value="all" />
        <Picker.Item label="5 km" value="5" />
        <Picker.Item label="10 km" value="10" />

      </Picker>
    </CardSection>
    <CardSection>
    <TouchableOpacity
      style={styles.buttonStyle}
      onPress={() => Actions.map({ Markers: this.props.Markers, radius: this.state.radius, category: this.state.category })}
      >
      <Text style={styles.textStyle}>search</Text>
    </TouchableOpacity>
</CardSection>
  </View>
)
}

 state = { radius: 'all', category: 'all' };

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
export default connect(MapStateTpProps)(SearchByCategory);
