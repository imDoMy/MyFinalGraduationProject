import React, { Component } from "react";
import { Text, View } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import { Icon } from 'native-base';
import { Scene, Router, ActionConst, Tabs, Action } from 'react-native-router-flux';
import AlbumList from './components/AlbumList';
import Business from './components/Business';
import Reviews from './components/Reviews';
import MainPage from './components/MainPage';
import LoginForm from './components/LoginForm';
import Register from './components/Register';
import ReviewForm from './components/ReviewForm';
import MapComponent from './components/MapComponent';
import Search from './components/Search';
import UserProfile from './components/UserProfile';
import UserReviews from './components/UserReviews';
import SearchByName from './components/SearchByName';
import SearchByCategory from './components/SearchByCategory';
import FavoriteList from './components/FavoriteList';
import FavBusiness from './components/FavBusiness';
import RecommendedBusinesses from './components/RecommendedBusinesses';
import RecommendIneer from './components/RecommendIneer';
import feedback from './components/feedback';
import Reviews2 from './components/Reviews2';



class TabIcon extends Component {
  render() {
    const title = this.props.title;
    let icon = '';
    if (title === 'Profile') {
      icon = 'person';
    }
    if (title === 'Main') {
      icon = 'home';
    }

    return (

      <Icon name={icon} style={{  fontSize : 35, color: this.props.focused ? '#007AFF' : 'black'}} />


    );
  }
}


 class RouterComponent extends Component  {



render() {
  return (
    <Router>
    <Scene key='root' hideNavBar panHandlers={null}>
    <Scene key='Auth' >
      <Scene key='MainP' component={MainPage} title='' />
      <Scene key='Login' component={LoginForm} backTitle="" title=' ' />
      <Scene key='Register' component={Register} panHandlers={null} backTitle="" title='' />
     </Scene>

      <Scene key='tabbar' tabs={true}  showLabel={false}  lazy={true} tabBarStyle={{ backgroundColor: '#fefefe', borderTopWidth: 1 }} tabBarPosition="bottom" useNativeDriver={true}>
        <Scene key='Main' title='Main' icon={TabIcon} tabBarStyle={{ borderWidth: 1 }}  >
          <Scene key='business' component={AlbumList} type={'reset'} backTitle="" title='' initial hideNavBar={false} />
          <Scene key='businessInner' component={Business} backTitle="" title=' ' />
          <Scene key='reviews' component={Reviews} backTitle="" title='' />
          <Scene key='reviewForm'component={ReviewForm} backTitle="" title='' />
          <Scene key='map' component={MapComponent} title=''  />
          <Scene key='search' component={Search} title=' ' />
          <Scene key='searchbyname' component={SearchByName} title=' ' />
          <Scene key='searchbycategory' component={SearchByCategory} title=' ' />
          <Scene key='Reviews2' component={Reviews2} title=' ' />


        </Scene>
        <Scene key='Profile' title='Profile' icon={TabIcon} modal={true}  >
        <Scene key='info' component={UserProfile} title='' />
        <Scene key='userreview' component={UserReviews} title='' />
        <Scene key='fav' component={FavoriteList} title='' />
        <Scene key='favinner' component={FavBusiness} title='' />
        <Scene key='recom' component={RecommendedBusinesses} title='' />
        <Scene key='RecommendIneer' component={RecommendIneer} title='' />
        <Scene key='feed' component={feedback} title='' />





        </Scene>

      </Scene>

    </Scene>
    </Router>
  )
}
//    return (
//
//      <Router>
//
//       <Scene key='root' hideNavBar panHandlers={null}>

      // <Scene key='Auth' >
      // <Scene key='MaienP' component={FooterTabsIconExample} title='الصفحة الرئيسية' />
      //
      //   <Scene key='MainP' component={MainPage} title='الصفحة الرئيسية' />
      //   <Scene key='Login' component={LoginForm} backTitle="رجوع" title='تسجيل الدخول' />
      //   <Scene key='Register' component={Register} panHandlers={null} backTitle="رجوع" title='التسجيل' />
      //  </Scene>

       // <Tabs tabs={true} showLabel={false} lazy = {true} tabBarStyle={[{ backgroundColor:'#fefefe',  borderTopWidth:0.3}]} tabBarPosition="bottom" useNativeDriver={true}>
//       <Scene
// key='Main' title="Home"  modal focused icon={TabIcon}
//
//           useNativeDriver
//            >
//         <Scene key='business' component={AlbumList} type={'reset'} backTitle="رجوع" title='المتاجر' initial/>
//         <Scene key='businessInner' component={Business} backTitle="رجوع" title='تفاصيل المتجر' />
//         <Scene key='reviews' component={Reviews} backTitle="رجوع" title='المراجعات' />
//         <Scene key='reviewForm'component={ReviewForm} backTitle="رجوع" title='كتابة المراجعات ' />
//         <Scene key='map' component={MapComponent} title='الصفحة الرئيسية' />
//         <Scene key='search' component={Search} title='الصفحة الرئيسية' />
//       </Scene>

//       <Scene
// key='Profile' title="Profile"  modal icon={TabIcon}
//
//           useNativeDriver
//           iconStyle={[{ alignItems:'flex-start'}]} >
//
//           <Scene key='info' component={UserProfile} title=' الملف الشخصي'  />
//
//           </Scene>
//
//
//       </Tabs>
//
//
//
//
//
//       </Scene>
//
//      </Router>
//
//    );
 };

 module.exports = RouterComponent;
