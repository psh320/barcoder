import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {RegisterForm, recoilRegister} from '../state';
import {RegisterErrorText} from '../components/RegisterErrorText';
import {RegisterTitleView} from '../components/RegisterTitleView';
import {RegisterNextButton} from '../components/RegisterNextButton';
import {RegisterTextinput} from '../components/RegisterTextinput';
import {useTimer} from '../hooks/useTimer';
import {getUsernameExist} from '../api';

export const RegisterUsername = () => {
  const [usernameExistError, setUsernameExistError] = useState(false);
  const [register, setRegister] = useRecoilState<RegisterForm>(recoilRegister);
  const formData = useForm({
    mode: 'onChange',
    defaultValues: {
      username: '',
    },
  });
  let usernameInput = formData.getValues('username');
  useEffect(() => {
    if (usernameExistError && usernameInput.length > 0) {
      setUsernameExistError(false);
    }
  }, [usernameInput]);

  const usernameInputRef = useRef<TextInput>(null);
  const [isloaded] = useTimer(100);
  useEffect(() => {
    if (isloaded) {
      usernameInputRef.current?.focus();
    }
  }, [isloaded]);

  const onSubmit = (data: {username: string}) => {
    getUsernameExist(data.username)
      .then(res => {
        console.log('중복체크 완료', res);
        setUsernameExistError(res);
        if (!res) {
          setRegister({...register, username: data.username});
          navigation.navigate('RegisterPassword');
        }
      })
      .catch(err => console.log('중복체크 완료 에러! ', err));
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={[{marginHorizontal: 16, flex: 1}]}>
        <View style={[styles.registerHeader]}>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Image
              source={require('../asset/backIcon.png')}
              style={{width: 20, height: 20}}
            />
          </TouchableOpacity>
        </View>
        <View style={{justifyContent: 'space-between', flex: 1}}>
          <View style={[{marginHorizontal: 16}]}>
            <RegisterTitleView title="아이디를 입력해주세요.">
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 16,
                }}>
                <Text style={[{fontSize: 12, color: '#AAAAAA'}]}>
                  사용자 이름은{' '}
                </Text>
                <Text style={[{fontSize: 12, color: '#000000'}]}>최대 30</Text>
                <Text style={[{fontSize: 12, color: '#AAAAAA'}]}>자리의 </Text>
                <Text style={[{fontSize: 12, color: '#000000'}]}>
                  영문·숫자·_
                </Text>
                <Text style={[{fontSize: 12, color: '#AAAAAA'}]}>
                  만 가능합니다.
                </Text>
              </View>
            </RegisterTitleView>

            <View style={[{flexDirection: 'row'}]}>
              <RegisterTextinput
                ref={usernameInputRef}
                formData={formData}
                placeholder="사용자 이름을 입력해주세요."
                maxLength={30}
                fieldKey="username"
                keyboardType="default"
                autoCapitalize="none"
                rules={{
                  required: true,
                  pattern: {
                    value: /^[a-z0-9_]+$/i,
                  },
                }}
                onSubmitEditing={formData.handleSubmit(onSubmit)}
              />
            </View>

            {formData.formState.errors.username?.type === 'required' && (
              <RegisterErrorText errorMessage="필수 입력 사항입니다." />
            )}
            {formData.formState.errors.username?.type === 'pattern' && (
              <RegisterErrorText errorMessage="사용자 이름을 형식에 맞게 입력해주세요." />
            )}
            {usernameExistError && (
              <RegisterErrorText errorMessage="중복되는 사용자 이름입니다." />
            )}
          </View>

          <RegisterNextButton
            onPress={formData.handleSubmit(onSubmit)}
            text="다음으로"
            disabled={usernameInput.length === 0}
          />
        </View>
      </View>
      {/* <RegisterModal
        isOpen={goBackModal}
        disclose={() => setGoBackModal(false)}
      /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  registerHeader: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  countryCodeButton: {
    borderBottomColor: '#101010',
    borderBottomWidth: 1,
    paddingVertical: 12,
    marginRight: 8,
  },
  nextButton: {
    height: 50,
    backgroundColor: '#5546FF',
    borderRadius: 10,
    marginBottom: 16,
  },
});
