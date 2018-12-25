import React, { Component } from 'react';
import { View, Text, Picker, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { WriteReview, reviewUpdate, BusinessFetch, BusinessUpdate } from '../actions';
import { CardSection, Card, Section, TextInputt, TextInputtE } from './common';


class SearchByName extends Component {
  state = {
    text: ''
  }
nav() {
  if(!this.state.text) {
    return Actions.map({ Markers: this.props.Markers, radius: this.state.radius, search: '' })
  }
  const text = this.state.text
  const lower = text.toLowerCase();
  return Actions.map({ Markers: this.props.Markers, radius: this.state.radius, search: lower })

}
language() {
  if (this.props.language === 'Arabic') {
    return (
      <View>
      <Card>
      <Section>

        <TextInputt
        label="اسم المتجر"
        placeholder="اسم المتجر"
        value={this.state.text}
        onChangeText={text => this.setState({ text })}
        />
        </Section>

</Card>


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
          onPress={() => this.nav()}
          >
          <Text style={styles.textStyle}> اضغط هنا للبحث </Text>
        </TouchableOpacity>
</CardSection>
      </View>
    );
}
return (
  <View>
  <Card>
  <Section>
    <TextInputtE
    label="Business name"
    placeholder="write the name here"
    value={this.state.text}
    onChangeText={text => this.setState({ text })}
    />
    </Section>

</Card>

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
      onPress={() => this.nav()}
      >
      <Text style={styles.textStyle}>search</Text>
    </TouchableOpacity>
</CardSection>
  </View>
)
}

 state = { radius: 'all' };

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
export default connect(MapStateTpProps)(SearchByName);
