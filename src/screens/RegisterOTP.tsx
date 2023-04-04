import React, {useEffect, useRef, useState} from 'react';
import {
  StyleSheet,
  SafeAreaView,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AuthCharView} from '../components/AuthCharView';
import {RegisterTitleView} from '../components/RegisterTitleView';
import {RegisterErrorText} from '../components/RegisterErrorText';
import {useTimer} from '../hooks/useTimer';
import {useRecoilValue} from 'recoil';
import {RegisterForm} from '../state';
import {recoilRegister} from '../state';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../nav/RootStackScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'RegisterOTP'>;

export const RegisterOTP = ({route}: Props) => {
  const registerForm = useRecoilValue<RegisterForm>(recoilRegister);
  const [authError, setAuthError] = useState(false);
  const [authInput, setAuthInput] = useState('');
  const authInputRef = useRef<TextInput>(null);
  useEffect(() => {
    if (authInput.length === 6) {
      onSubmit();
    }
    if (authError && authInput.length > 0) {
      setAuthError(false);
    }
  }, [authInput]);

  const [isloaded] = useTimer(10);
  useEffect(() => {
    if (isloaded) {
      authInputRef.current?.focus();
    }
  }, [isloaded]);

  const authCharacterView = () => {
    return [...Array(6)].map((value, index) => {
      return <AuthCharView char={authInput[index]} key={index} />;
    });
  };

  const onSubmit = () => {
    if (String(authInput) !== String(route.params.authKey)) {
      setAuthError(true);
      setAuthInput('');
    } else {
      navigation.navigate('RegisterUsername');
    }
  };

  const navigation = useNavigation();

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={[{marginHorizontal: 16, flex: 1}]}>
        <View style={[styles.registerHeader]}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../asset/backIcon.png')}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
        </View>

        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View style={{marginHorizontal: 16}}>
            <RegisterTitleView title="인증번호를 입력해주세요.">
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 16,
                }}>
                <Text style={[{fontSize: 12}, {color: '#000000'}]}>
                  {registerForm.phoneNumber}
                </Text>
                <Text style={[{fontSize: 12}, {color: '#AAAAAA'}]}>
                  로 인증번호가 전송됬어요
                </Text>
              </View>
            </RegisterTitleView>

            <View>
              <View style={[{flex: 1, marginTop: 8}]}>
                <TextInput
                  ref={authInputRef}
                  style={[styles.registerTextInput, {opacity: 0, zIndex: 10}]}
                  keyboardType="number-pad"
                  maxLength={6}
                  onChangeText={text => {
                    setAuthInput(text);
                  }}
                  value={authInput}
                />

                <View style={[styles.authContainer]}>
                  <View
                    style={[
                      {justifyContent: 'space-around', flexDirection: 'row'},
                    ]}>
                    {authCharacterView()}
                  </View>

                  {authError && (
                    <RegisterErrorText
                      errorMessage={'인증번호가 일치하지 않습니다.'}
                    />
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  registerTitle: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 24,
    lineHeight: 30,
    marginTop: 16,
  },
  registerTextInput: {
    height: 50,
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#5546FF',
    color: '#5546FF',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerHeader: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  authContainer: {position: 'absolute', top: -64, zIndex: -10, width: '100%'},
});
