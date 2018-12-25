import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Dimensions,
  Text,
  TouchableOpacity,
  Image,
  Alert
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import MapView from 'react-native-maps';
import { CardSection, Input, Card } from './common';

const { width, height } = Dimensions.get('window')

const SCREEN_HEIGHT = height;
const SCREEN_WIDTH = width;
const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

class MapComponent extends Component {

  constructor() {
    super();
    this.state = {
      initialPosition: {
        latitude: 0,
        longitude: 0,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      },
      Markers: [{ coordinate: {
        latitude: 0,
        longitude: 46.76889,
      }
    }, { coordinate: {
      latitude: 254.774265,
      longitude: 46.738586,
    }
   }
  ]
    };
  }


  componentDidMount() {
    console.log('this.props.Marker');
    console.log(this.props.Markers);
    console.log('this.props.Marker');

    navigator.geolocation.getCurrentPosition((position) => {
      var lat = parseFloat(position.coords.latitude)
      var long = parseFloat(position.coords.longitude)

      var initialRegion = {
        latitude: lat,
        longitude: long,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
      }

      this.setState({ initialPosition: initialRegion })
    },
    (error) => alert("Bad connction"),
    { enableHighAccuracy: true, timeout: 200000, maximumAge: 10000 });
  }


   getDistanceFromLatLonInKm(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  var dLon = this.deg2rad(lon2-lon1);
  var a =
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  var d = R * c; // Distance in km

  console.log('coords1');

  console.log(d);
  console.log('coords1');
  return d;
}

 deg2rad(deg) {
  return deg * (Math.PI/180)
}

  navigateToView(marker) {
// if(this.props.Markers.length === 1){
//   console.log('this.props.Markers[0]');
//   console.log(this.props.Markers[0]);
//   console.log('this.props.Markers[0]');
//
//   Actions.businessInner({ business: this.props.Markers[0], initialPosition: this.state.initialPosition  });
//
// } else {
//   console.log('marker');
//   console.log(marker);
//   console.log('marker');
//
// }
if (this.props.em || this.props.emaillog) {

return Actions.businessInner({ business: marker, initialPosition: this.state.initialPosition  });
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
)}
  }
  renderMarker(marker) {
    const location = {
       coordinate: {
        latitude: marker.latitude,
        longitude: marker.longitude,
      }
    };
    let searchName = this.props.search;
    let category = this.props.category;
    if(!searchName) {
      searchName = '';
    }
    if(!category){
      category = 'all'
    }
    if (this.props.radius === undefined || this.props.radius === 'all') {
      if(searchName === '' || searchName === marker.restaurant_name || searchName === marker.restaurant_nameE  ){
        if(category === 'all' || category === marker.categoryE){


      if(this.props.language === 'Arabic') {
    return (
      <View>

      <MapView.Marker
      coordinate={location.coordinate}
      >

      <MapView.Callout

      style={{ width: 160, height: 115
      }}>
      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>

          <View style={{ flexDirection: 'column' }}>
          <View>
            <Text style={{ textAlign: 'right', fontSize: 15 }}>
اسم المتجر :
            </Text>
            <Text style={{ textAlign: 'right', fontSize: 12  }}>
          {marker.restaurant_name}
            </Text>
            <Text style={{ textAlign: 'right', fontSize: 15 }}>
            نوع المتجر:
            </Text>

            <Text style={{ textAlign: 'right', fontSize: 12 }}>
            {marker.category}
            </Text>
            </View>
          </View>
          <View
  style={{
  borderLeftWidth: 1,
  borderLeftColor: 'black',
  marginLeft: 10
  }}
/>
  <View style={{ flexDirection: 'column' }}>
  <View style={{ marginLeft: 20 }}>
  <Image
    style={{ width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    resizeMode: 'stretch',

    }}
    source={{ uri: marker.image }}
  />
  </View>
  <View style={{ marginLeft: 10, marginTop: 5 }}>
  <Image
    style={{ width: 70,
    height: 30,
    resizeMode: 'stretch',

    }}
    source={{ uri: marker.rateing_image }}
  />
  </View>

  </View>
          </View>
          <View
  style={{
  borderBottomWidth: 1,
  borderBoColor: 'black',
  marginTop: 5
  }}
/>

          <View style={{ flexDirection: 'column', marginTop: 5 }}>
          <View style={{ alignSelf: 'flex-end' }}>
           <TouchableOpacity onPress={() => this.navigateToView(marker)}>
           <Image
             style={{ width: 20,
             height: 20,
             borderWidth: 1,
             borderRadius: 10,
             }}
             source={{ uri:'https://thumb.ibb.co/mZ9YaA/if-arrow-right-01-186409.png' }}
           />

           </TouchableOpacity>
           </View>
           </View>

          </View>

      </MapView.Callout>
      </MapView.Marker>
      </View>
    );
  } else {
    return (
      <View>

      <MapView.Marker
      coordinate={location.coordinate}
      >

      <MapView.Callout

      style={{ width: 210, height: 115
      }}>
      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>

          <View style={{ flexDirection: 'column' }}>
          <View>
            <Text style={{ textAlign: 'right', fontSize: 15 }}>
            Business Name
            </Text>
            <Text style={{ textAlign: 'right', fontSize: 12  }}>
          {marker.restaurant_nameE}
            </Text>
            <Text style={{ textAlign: 'right', fontSize: 15 }}>
             Category
            </Text>

            <Text style={{ textAlign: 'right', fontSize: 12 }}>
            {marker.categoryE}
            </Text>
            </View>
          </View>
          <View
  style={{
  borderLeftWidth: 1,
  borderLeftColor: 'black',
  marginLeft: 10
  }}
/>
  <View style={{ flexDirection: 'column' }}>
  <View style={{ marginLeft: 20 }}>
  <Image
    style={{ width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    resizeMode: 'stretch',

    }}
    source={{ uri: marker.image }}
  />
  </View>
  <View style={{ marginLeft: 10, marginTop: 5 }}>
  <Image
    style={{ width: 70,
    height: 30,
    resizeMode: 'stretch',

    }}
    source={{ uri: marker.rateing_image }}
  />
  </View>

  </View>
          </View>
          <View
  style={{
  borderBottomWidth: 1,
  borderBoColor: 'black',
  marginTop: 5
  }}
/>
<View style={{ flexDirection: 'column', marginTop: 5 }}>
<View style={{ alignSelf: 'flex-end' }}>
 <TouchableOpacity onPress={() => this.navigateToView(marker)}>
 <Image
   style={{ width: 20,
   height: 20,
   borderWidth: 1,
   borderRadius: 10,
   }}
   source={{ uri:'https://thumb.ibb.co/mZ9YaA/if-arrow-right-01-186409.png' }}
 />

 </TouchableOpacity>
 </View>
 </View>

          </View>

      </MapView.Callout>
      </MapView.Marker>
      </View>
    );
  }
}
}
  }

  if (this.getDistanceFromLatLonInKm(location.coordinate.latitude,location.coordinate.longitude, this.state.initialPosition.latitude, this.state.initialPosition.longitude ) <= this.props.radius && (searchName === '' || searchName === marker.restaurant_name || searchName === marker.restaurant_nameE) && (category === 'all' || category === marker.categoryE)) {
    if(this.props.language === 'Arabic') {
    return (
      <View>
      <MapView.Circle
   center={this.state.initialPosition }
   radius={(this.props.radius * 1000)}
   strokeWidth = { 1 }
   strokeColor = { '#1a66ff' }
   fillColor = {  'rgba(230,238,255,0.5)' }


/>
      <MapView.Marker
      coordinate={location.coordinate}
      >

      <MapView.Callout

      style={{ width: 160, height: 115
      }}>
      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>

          <View style={{ flexDirection: 'column' }}>
          <View>
            <Text style={{ textAlign: 'right', fontSize: 15 }}>
اسم المتجر :
            </Text>
            <Text style={{ textAlign: 'right', fontSize: 12  }}>
          {marker.restaurant_name}
            </Text>
            <Text style={{ textAlign: 'right', fontSize: 15 }}>
            نوع المتجر:
            </Text>

            <Text style={{ textAlign: 'right', fontSize: 12 }}>
            {marker.category}
            </Text>
            </View>
          </View>
          <View
  style={{
  borderLeftWidth: 1,
  borderLeftColor: 'black',
  marginLeft: 10
  }}
/>
  <View style={{ flexDirection: 'column' }}>
  <View style={{ marginLeft: 20 }}>
  <Image
    style={{ width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    resizeMode: 'stretch',

    }}
    source={{ uri: marker.image }}
  />
  </View>
  <View style={{ marginLeft: 10, marginTop: 5 }}>
  <Image
    style={{ width: 70,
    height: 30,
    resizeMode: 'stretch',

    }}
    source={{ uri: marker.rateing_image }}
  />
  </View>

  </View>
          </View>
          <View
  style={{
  borderBottomWidth: 1,
  borderBoColor: 'black',
  marginTop: 5
  }}
/>

          <View style={{ flexDirection: 'column', marginTop: 5 }}>
          <View style={{ alignSelf: 'flex-end' }}>
           <TouchableOpacity onPress={() => this.navigateToView(marker)}>
           <Image
             style={{ width: 20,
             height: 20,
             borderWidth: 1,
             borderRadius: 10,
             }}
             source={{ uri:'https://thumb.ibb.co/mZ9YaA/if-arrow-right-01-186409.png' }}
           />

           </TouchableOpacity>
           </View>
           </View>

          </View>

      </MapView.Callout>
      </MapView.Marker>
      </View>

    );
  } else{
    return (
      <View>

      <MapView.Marker
      coordinate={location.coordinate}
      >

      <MapView.Callout

      style={{ width: 210, height: 115
      }}>
      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row' }}>

          <View style={{ flexDirection: 'column' }}>
          <View>
            <Text style={{ textAlign: 'right', fontSize: 15 }}>
            Business Name
            </Text>
            <Text style={{ textAlign: 'right', fontSize: 12  }}>
          {marker.restaurant_nameE}
            </Text>
            <Text style={{ textAlign: 'right', fontSize: 15 }}>
             Category
            </Text>

            <Text style={{ textAlign: 'right', fontSize: 12 }}>
            {marker.categoryE}
            </Text>
            </View>
          </View>
          <View
  style={{
  borderLeftWidth: 1,
  borderLeftColor: 'black',
  marginLeft: 10
  }}
/>
  <View style={{ flexDirection: 'column' }}>
  <View style={{ marginLeft: 20 }}>
  <Image
    style={{ width: 50,
    height: 50,
    borderWidth: 1,
    borderRadius: 10,
    resizeMode: 'stretch',

    }}
    source={{ uri: marker.image }}
  />
  </View>
  <View style={{ marginLeft: 10, marginTop: 5 }}>
  <Image
    style={{ width: 70,
    height: 30,
    resizeMode: 'stretch',

    }}
    source={{ uri: marker.rateing_image }}
  />
  </View>

  </View>
          </View>
          <View
  style={{
  borderBottomWidth: 1,
  borderBoColor: 'black',
  marginTop: 5
  }}
/>
<View style={{ flexDirection: 'column', marginTop: 5 }}>
<View style={{ alignSelf: 'flex-end' }}>
 <TouchableOpacity onPress={() => this.navigateToView(marker)}>
 <Image
   style={{ width: 20,
   height: 20,
   borderWidth: 1,
   borderRadius: 10,
   }}
   source={{ uri:'https://thumb.ibb.co/mZ9YaA/if-arrow-right-01-186409.png' }}
 />

 </TouchableOpacity>
 </View>
 </View>

          </View>

      </MapView.Callout>
      </MapView.Marker>
      </View>
    );
  }
  }
  return (
  <View>
  <MapView.Circle
center={this.state.initialPosition }
radius={(this.props.radius * 1000)}
strokeWidth = { 1 }
strokeColor = { '#1a66ff' }
fillColor = {  'rgba(230,238,255,0.5)' }


/>
</View>
)
  }

  renderScreen = () => {

          return (
        <View style={styles.container}>
        { this.state.initialPosition.latitude &&
          <MapView
            style={styles.map}
            showsUserLocation
            userLocationAnnotationTitle='موقعي الحالي'
            initialRegion={this.state.initialPosition}
          >


          {this.props.Markers.map((marker) => (
          this.renderMarker(marker)

          ))}

            </ MapView>
          }
        </View>
      );
  }

  render() {
    return (
      this.renderScreen()
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
    justifyContent: 'flex-end',
    alignItems: 'center',
},
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
});
const MapStateTpProps = state => {
const language = state.language.Language;
const em = state.auth.email;
const emaillog = state.auth.emaillog;
return ({ em, emaillog, language });
};
export default connect(MapStateTpProps)(MapComponent);

// followsUserLocation will keep following the user locatoin
// renderScreen = () => {
//
//         return (
//       <View style={styles.container}>
//       { this.state.initialPosition.latitude &&
//         <MapView
//           style={styles.map}
//           showsUserLocation
//           followsUserLocation
//           userLocationAnnotationTitle='موقعي الحالي'
//           initialRegion={this.state.initialPosition}
//         >
//
//
//         {this.props.Markers.map((marker) => (
//         this.renderMarker(marker)
//
//         ))}
//
//           </ MapView>
//         }
//       </View>
//     );
// }
