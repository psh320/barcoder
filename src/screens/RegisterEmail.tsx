import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
  View,
  Text,
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

export const RegisterEmail = () => {
  const [register, setRegister] = useRecoilState<RegisterForm>(recoilRegister);
  const formData = useForm({
    mode: 'onChange',
    defaultValues: {
      email: '',
    },
  });
  let emailInput = formData.getValues('email');
  const emailInputRef = useRef<TextInput | null>(null);
  const [isloaded] = useTimer(100);
  useEffect(() => {
    if (isloaded) {
      emailInputRef.current?.focus();
    }
  }, [isloaded]);

  const onSubmit = (data: {email: string}) => {
    console.log(data);
    setRegister({...register, email: data.email});
    navigation.navigate('RegisterAgreement');
  };

  const navigation = useNavigation();
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
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
          <View style={[{marginHorizontal: 16}]}>
            <RegisterTitleView title="이메일을 입력해주세요.">
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  marginTop: 16,
                }}>
                <Text style={[{fontSize: 12, color: '#AAAAAA'}]}>
                  이메일은 나중에 로그인 문제들을 해결하기 위해 사용됩니다.
                </Text>
              </View>
            </RegisterTitleView>

            <View style={[{flexDirection: 'row'}]}>
              <RegisterTextinput
                ref={emailInputRef}
                formData={formData}
                placeholder="이메일을 입력해주세요"
                maxLength={40}
                fieldKey="email"
                keyboardType="email-address"
                autoCapitalize="none"
                rules={{
                  required: true,
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  },
                }}
                onSubmitEditing={formData.handleSubmit(onSubmit)}
              />
            </View>

            {formData.formState.errors.email?.type === 'required' && (
              <RegisterErrorText errorMessage="필수 입력사항입니다." />
            )}
            {formData.formState.errors.email?.type === 'pattern' && (
              <RegisterErrorText errorMessage="올바른 이메일 형식이 아닙니다." />
            )}
          </View>
          <RegisterNextButton
            onPress={formData.handleSubmit(onSubmit)}
            text="다음으로"
            disabled={emailInput.length === 0}
          />
        </View>
      </View>
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
