import React, {useEffect, useMemo, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {KeyboardAvoidingView, Platform, StyleSheet} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRecoilState} from 'recoil';
import * as Keychain from 'react-native-keychain';
import {recoilLogin} from '../state';
import {useMutation} from 'react-query';
import {postLoginUser} from '../api';
import {RegisterErrorText} from '../components/RegisterErrorText';

export const Login = () => {
  const navigation = useNavigation();
  const [userId, setUserId] = useRecoilState(recoilLogin);
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [isEmpty, setIsEmpty] = useState(true);
  const [loginError, setLoginError] = useState(false);

  useEffect(() => {
    setIsEmpty(loginId.length === 0 || password.length === 0);
  }, [loginId, password]);

  const loginMutation = useMutation(
    (loginData: {loginId: string; password: string}) =>
      postLoginUser(loginData),
    {
      onSuccess: data => {
        console.log('로그인 성공: ', data);
        setToken(data);
        navigation.navigate('Home');
      },
      onError: err => {
        console.log('로그인 실패: ', err);
        setLoginError(true);
      },
    },
  );
  useEffect(() => {
    setLoginError(false);
  }, [loginId, password]);

  const setToken = async (tokenData: any) => {
    await Keychain.setGenericPassword(
      tokenData.accessToken,
      tokenData.refreshToken,
    );
    await AsyncStorage.multiSet([['userId', String(tokenData.userId)]]);
    await setUserId({userId: tokenData.userId, isLogin: true});
  };

  const goLogin = (data: {loginId: string; password: string}) => {
    loginMutation.mutate(data);
  };

  const loginInputStyle = useMemo(
    () => [
      {
        borderBottomColor: loginId.length === 0 ? '#C4C4C4' : '#000000',
        color: '#000000',
      },
      styles.loginTextInput,
    ],
    [loginId],
  );

  const passwordInputStyle = useMemo(
    () => [
      {
        borderBottomColor: password.length === 0 ? '#C4C4C4' : '#000000',
        color: '#000000',
      },
      styles.loginTextInput,
    ],
    [password.length],
  );

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 16,
          height: 50,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../asset/backIcon.png')}
            style={{width: 24, height: 24, marginRight: 8}}
          />
        </TouchableOpacity>
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{
          justifyContent: 'center',
          flex: 0.8,
          marginHorizontal: 16,
        }}>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 48,
          }}>
          <Image
            source={require('../asset/splashLogo.png')}
            style={{width: 83, height: 108}}
          />
        </View>

        <View style={{marginBottom: 32}}>
          <Text style={{color: '#000000'}}>아이디</Text>
          <TextInput
            style={loginInputStyle}
            value={loginId}
            onChangeText={setLoginId}
            placeholder="아이디를 입력해주세요"
            placeholderTextColor={'#C4C4C4'}
            autoCapitalize="none"
          />
        </View>
        <View style={{marginBottom: 32}}>
          <Text style={{color: '#000000'}}>비밀번호</Text>
          <TextInput
            style={passwordInputStyle}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={true}
            placeholder="비밀번호를 입력해주세요"
            placeholderTextColor={'#C4C4C4'}
          />
          <View style={{}}>
            {loginError && (
              <RegisterErrorText
                errorMessage={'아이디 또는 비밀번호가 맞지 않습니다.'}
              />
            )}
          </View>
        </View>

        <TouchableOpacity
          disabled={isEmpty || loginMutation.isLoading}
          onPress={() =>
            goLogin({
              loginId: loginId,
              password: password,
            })
          }
          style={[
            {
              justifyContent: 'center',
              alignItems: 'center',
              marginHorizontal: 32,
              paddingVertical: 16,
              borderRadius: 10,
              marginBottom: 32,
              backgroundColor: '#000000',
            },
          ]}>
          <Text style={[{color: 'white'}]}>로그인</Text>
        </TouchableOpacity>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
            height: 40,
            justifyContent: 'space-around',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
            onPress={() => {
              navigation.navigate('RegisterPhone');
            }}>
            <Text style={{color: '#000000'}}>회원가입</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}
            onPress={() => {
              navigation.navigate('RegisterFindPassword');
            }}>
            <Text style={{color: '#000000'}}>비밀번호 찾기</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginTextInput: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
