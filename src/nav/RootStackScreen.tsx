import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Home} from '../screens/Home';
import {Scanner} from '../screens/Scanner';
import {Product} from '../screens/Product';
import {MyPage} from '../screens/MyPage';
import {Search} from '../screens/Search';
import {Login} from '../screens/Login';
import {BannerOne} from '../screens/BannerOne';
import {BannerTwo} from '../screens/BannerTwo';
import {RegisterPhone} from '../screens/RegisterPhone';
import {RegisterOTP} from '../screens/RegisterOTP';
import {RegisterUsername} from '../screens/RegisterUsername';
import {RegisterPassword} from '../screens/RegisterPassword';
import {RegisterName} from '../screens/RegisterName';
import {RegisterEmail} from '../screens/RegisterEmail';
import {RegisterAgreement} from '../screens/RegisterAgreement';
import {Splash} from '../screens/Splash';
import {RegisterFindPassword} from '../screens/RegisterFindPassword';
import {RegisterChangePassword} from '../screens/RegisterChangePassword';

const RootStack = createStackNavigator<RootStackParamList>();

export type RootStackParamList = {
  Splash: undefined;
  Home: undefined;
  Scanner: undefined;
  Product: {url: string};
  MyPage: undefined;
  Search: {search: string};
  Login: undefined;
  BannerOne: undefined;
  BannerTwo: undefined;
  RegisterPhone: undefined;
  RegisterOTP: {authKey: string};
  RegisterUsername: undefined;
  RegisterPassword: undefined;
  RegisterName: undefined;
  RegisterEmail: undefined;
  RegisterAgreement: undefined;
  RegisterFindPassword: undefined;
  RegisterChangePassword: {phoneNumber: string};
};

export const RootStackScreen = () => {
  return (
    <RootStack.Navigator
      initialRouteName="Splash"
      screenOptions={{headerShown: false}}>
      <RootStack.Screen name="Splash" component={Splash} />
      <RootStack.Screen name="Home" component={Home} />
      <RootStack.Screen name="Scanner" component={Scanner} />
      <RootStack.Screen name="Product" component={Product} />
      <RootStack.Screen name="MyPage" component={MyPage} />
      <RootStack.Screen name="Search" component={Search} />
      <RootStack.Screen name="Login" component={Login} />
      <RootStack.Screen name="BannerOne" component={BannerOne} />
      <RootStack.Screen name="BannerTwo" component={BannerTwo} />
      <RootStack.Screen name="RegisterPhone" component={RegisterPhone} />
      <RootStack.Screen name="RegisterOTP" component={RegisterOTP} />
      <RootStack.Screen name="RegisterUsername" component={RegisterUsername} />
      <RootStack.Screen name="RegisterPassword" component={RegisterPassword} />
      <RootStack.Screen name="RegisterName" component={RegisterName} />
      <RootStack.Screen name="RegisterEmail" component={RegisterEmail} />
      <RootStack.Screen
        name="RegisterAgreement"
        component={RegisterAgreement}
      />
      <RootStack.Screen
        name="RegisterFindPassword"
        component={RegisterFindPassword}
      />
      <RootStack.Screen
        name="RegisterChangePassword"
        component={RegisterChangePassword}
      />
    </RootStack.Navigator>
  );
};
