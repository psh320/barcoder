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
import {useMutation} from 'react-query';
import {putChangePassword} from '../api';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../nav/RootStackScreen';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'RegisterChangePassword'
>;

/**
 * 회원가입 비밀번호 입력 페이지
 */
export const RegisterChangePassword = ({route}: Props) => {
  const noEmojis = /\p{Extended_Pictographic}/u;
  const formData = useForm({
    mode: 'onChange',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });
  let passwordInput = formData.getValues('password');
  const passwordMutation = useMutation(
    () => putChangePassword(passwordInput, route.params.phoneNumber),
    {
      onSuccess: data => {
        console.log('비밀번호 변경완료!:', data);
        navigation.navigate('Login');
      },
      onError: err => {
        console.log('비밀번호 변경 실패! :', err);
      },
    },
  );
  const onSubmit = (data: {password: string}) => {
    console.log(data);
    passwordMutation.mutate();
  };

  const showErrorMessage = () => {
    if (formData.formState.errors.password?.type === 'required') {
      return <RegisterErrorText errorMessage="필수 입력사항입니다." />;
    } else if (formData.formState.errors.password?.type === 'minLength') {
      return <RegisterErrorText errorMessage="최소 6자 이상이여야 합니다." />;
    } else if (
      formData.formState.errors.confirmPassword?.type === 'confirmValid'
    ) {
      return <RegisterErrorText errorMessage="비밀번호가 일치하지 않습니다." />;
    } else if (formData.formState.errors.password?.type === 'noEmoji') {
      return <RegisterErrorText errorMessage="이모지는 안돼요~" />;
    }
  };
  const confirmInputRef = useRef<TextInput | null>(null);
  const passwordInputRef = useRef<TextInput | null>(null);

  const [isloaded] = useTimer(100);
  useEffect(() => {
    if (isloaded) {
      passwordInputRef.current?.focus();
    }
  }, [isloaded]);
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
            <RegisterTitleView title="비밀번호를 입력해주세요." />
            <View style={{flexDirection: 'column'}}>
              <View style={[{flexDirection: 'row', marginBottom: 32}]}>
                <RegisterTextinput
                  ref={passwordInputRef}
                  formData={formData}
                  placeholder="비밀번호를 입력해주세요."
                  maxLength={20}
                  fieldKey="password"
                  rules={{
                    required: true,
                    minLength: 6,
                    validate: {
                      noEmoji: (value: string) => {
                        return !noEmojis.test(value);
                      },
                    },
                  }}
                  secureTextEntry={true}
                  onSubmitEditing={() => {
                    confirmInputRef.current?.focus();
                  }}
                />
              </View>
              <View style={[{flexDirection: 'row'}]}>
                <RegisterTextinput
                  ref={confirmInputRef}
                  formData={formData}
                  placeholder="비밀번호를 한번 더 입력해주세요."
                  maxLength={20}
                  fieldKey="confirmPassword"
                  rules={{
                    validate: {
                      confirmValid: (value: string) => {
                        return value === formData.getValues('password');
                      },
                    },
                  }}
                  secureTextEntry={true}
                  onSubmitEditing={formData.handleSubmit(onSubmit)}
                />
              </View>
            </View>

            {showErrorMessage()}
          </View>
          <RegisterNextButton
            onPress={formData.handleSubmit(onSubmit)}
            text="변경완료"
            disabled={passwordInput.length === 0}
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
  nextButton: {
    height: 50,
    backgroundColor: '#5546FF',
    borderRadius: 10,
    marginBottom: 16,
  },
  registerTextInput: {
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: '#5546FF',
    color: '#5546FF',
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
