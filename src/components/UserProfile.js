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
  ListView,
  Alert
} from "react-native";
import _ from 'lodash';
import firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { CardSection, Card, Button } from './common';
import { UserFetchInfo, Logout, FavoriteBusinessesFetch } from '../actions';


class UserProfile extends Component {


        componentWillMount() {
          this.props.UserFetchInfo();
          this.props.FavoriteBusinessesFetch();


          }

    renderRow() {
if (this.props.em || this.props.emlog ) {
  if (this.props.language === 'Arabic'){

        return (


          <Card style={{ flex: 1, marginTop: 20 }}>
            <CardSection>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
 const Inf = this.props.Info
                  Actions.userreview({ Info: Inf });
                }
              }
                >
                <Text style={styles.textStyle}> مراجعاتي  </Text>
              </TouchableOpacity>
            </CardSection>
            <CardSection>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => Actions.fav()}
                >
                <Text style={styles.textStyle}>المتاجر المفضلة</Text>
              </TouchableOpacity>
            </CardSection>

            <CardSection>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  const Inf = this.props.Info;
                  const FavFetch = this.props.FavFetch

                  Actions.recom({ Info: Inf, FavFetch });
                }}
                >
                <Text style={styles.textStyle}>المتاجر المقترحة</Text>
              </TouchableOpacity>
            </CardSection>
            <CardSection>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => {
                  Actions.feed();
                }}
                >
                <Text style={styles.textStyle}>اقتراح او شكوى </Text>
              </TouchableOpacity>
            </CardSection>
            <CardSection>
              <TouchableOpacity
                style={styles.buttonStyle}
                onPress={() => this.props.Logout()}
                >
                <Text style={styles.textStyle}> تسجيل الخروج  </Text>
              </TouchableOpacity>
            </CardSection>
        </Card>

      );
    } else {
      return (


        <Card style={{ flex: 1, marginTop: 20 }}>
          <CardSection>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
const Inf = this.props.Info
                Actions.userreview({ Info: Inf });
              }
            }
              >
              <Text style={styles.textStyle}> My reviews  </Text>
            </TouchableOpacity>
          </CardSection>
          <CardSection>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => Actions.fav()}
              >
              <Text style={styles.textStyle}> Favorite businesses</Text>
            </TouchableOpacity>
          </CardSection>
          <CardSection>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {
                const Inf = this.props.Info;
                const FavFetch = this.props.FavFetch
                Actions.recom({ Info: Inf, FavFetch });
              }}
              >
              <Text style={styles.textStyle}> Recommended businesses</Text>
            </TouchableOpacity>
          </CardSection>
          <CardSection>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => {

                Actions.feed();
              }}
              >
              <Text style={styles.textStyle}> feedback </Text>
            </TouchableOpacity>
          </CardSection>
          <CardSection>
            <TouchableOpacity
              style={styles.buttonStyle}
              onPress={() => this.props.Logout()}
              >
              <Text style={styles.textStyle}>logout</Text>
            </TouchableOpacity>
          </CardSection>
      </Card>

    );
    }
} else
{
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
};
    }
      render() {
                return (
                  this.renderRow()
                  )

          }
}

const MapStateTpProps = state => {
  const em = state.auth.email;
  const emlog = state.auth.emaillog;
  const language = state.language.Language;
  const Info = state.userInfo;
  const FavFetch = _.map(state.favoriteBusinesses, (val, uidd) => {
    return { ...val, uidd };
  });
  return { Info, em, emlog, language, FavFetch };
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
    alignSelf: "stretch",
    backgroundColor: "#fff",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#007aff",
    marginLeft: 5,
    marginRight: 5
  }
};
export default connect(MapStateTpProps, { UserFetchInfo, Logout, FavoriteBusinessesFetch })(UserProfile);
