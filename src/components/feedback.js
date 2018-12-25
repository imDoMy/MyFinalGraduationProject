import React, { Component } from 'react';
import { View, Text, Picker, TouchableOpacity, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { Feedback } from '../actions';
import { CardSection, Card, Section, TextInputt, TextInputtE, Input } from './common';


class feedback extends Component {
  state = {
    text: ''
  }
language() {
  console.log(this.props.language);
  if (this.props.language === 'Arabic') {
    return (
      <Card>
      <CardSection>
        <Input
          label="هنا"
          placeholder=""
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />
      </CardSection>
      <CardSection>
      <TouchableOpacity
        style={{
          flex: 1,
          alignSelf: "stretch",
          backgroundColor: "#fff",
          borderRadius: 5,
          borderWidth: 1,
          borderColor: "#007aff",
          marginLeft: 5,
          marginRight: 5
        }}
        onPress={() => this.props.Feedback({ text: this.state.text })}
        >
        <Text style={styles.textStyle}> ارسال </Text>
      </TouchableOpacity>
</CardSection>
      </Card>
    );
}
return (
  <Card>
  <CardSection>
    <Input
      label="Feedback"
      placeholder=""
      value={{
        alignSelf: "center",
        color: "#007aff",
        fontSize: 16,
        fontWeight: "600",
        paddingTop: 10,
        paddingBottom: 10
      }}
      onChangeText={text => this.setState({ text })}
    />
  </CardSection>
  <CardSection>
  <TouchableOpacity
    style={{
      flex: 1,
      alignSelf: "stretch",
      backgroundColor: "#fff",
      borderRadius: 5,
      borderWidth: 1,
      borderColor: "#007aff",
      marginLeft: 5,
      marginRight: 5
    }}
    onPress={() => this.props.Feedback({ text: this.state.text })}
    >
    <Text style={{
      alignSelf: "center",
      color: "#007aff",
      fontSize: 16,
      fontWeight: "600",
      paddingTop: 10,
      paddingBottom: 10
    }}> send </Text>
  </TouchableOpacity>
</CardSection>
  </Card>
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
export default connect(MapStateTpProps, { Feedback })(feedback);
