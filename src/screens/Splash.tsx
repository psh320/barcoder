import {useNavigation} from '@react-navigation/native';
import React, {FC, ReactNode, useEffect, useState} from 'react';
import {Image, SafeAreaView, StyleSheet} from 'react-native';
import {RootStackParamList} from '../nav/RootStackScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useRecoilState, useSetRecoilState} from 'recoil';
import {recoilLogin} from '../state';
import * as Keychain from 'react-native-keychain';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getScanItemList, getTopItemList} from '../api';
import {useQuery} from 'react-query';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export const Splash = ({route, navigation}: Props) => {
  const [login, setLogin] = useRecoilState(recoilLogin);

  const hasToken = async () => {
    try {
      const value = await Keychain.getGenericPassword();
      const storedUserId = await AsyncStorage.getItem('userId');
      if (value) {
        setLogin({isLogin: true, userId: Number(storedUserId)});
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    hasToken();

    setTimeout(() => {
      navigation.replace('Home');
    }, 1500);
  }, []);

  useQuery('TopItemList', getTopItemList);
  useQuery(['scanList', login.userId], () => getScanItemList(login.userId));
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#FFFFFF',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Image
        source={require('../asset/splashLogo.png')}
        style={{width: 83, height: 108}}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
