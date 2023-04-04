import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  StyleSheet,
  TextInput,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useRecoilState} from 'recoil';
import {recoilRegister, RegisterForm} from '../state';

import {RegisterErrorText} from '../components/RegisterErrorText';
import {RegisterNextButton} from '../components/RegisterNextButton';
import {RegisterTitleView} from '../components/RegisterTitleView';
import {RegisterTextinput} from '../components/RegisterTextinput';
import {useTimer} from '../hooks/useTimer';
import {useMutation} from 'react-query';
import {postSendSMS} from '../api';

export const RegisterPhone = () => {
  const [cooldownList, setCooldownList] = useState<string[]>([]);
  const [cooldownError, setCooldownError] = useState(false);

  const formData = useForm({
    mode: 'onChange',
    defaultValues: {
      phone: '',
    },
  });
  let phoneInput = formData.getValues('phone');

  useEffect(() => {
    if (setCooldownError && phoneInput.length > 0) {
      setCooldownError(false);
    }
  }, [phoneInput]);

  const addCooldownWithTimer = (keyNumber: string) => {
    const id = setTimeout(() => {
      console.log('number is ', keyNumber);
      setCooldownList(prev => prev.filter(number => number !== keyNumber));
      clearTimeout(id);
    }, 120000);
  };

  const sendSMSMutation = useMutation(
    (phoneNumber: string) => postSendSMS({countryCode: '82', to: phoneNumber}),
    {
      onSuccess: data => {
        console.log('문자 보내기 성공: ', data);
        navigation.navigate('RegisterOTP', {authKey: data});
      },
      onError: err => {
        console.log('문자 보내기 실패: ', err);
      },
    },
  );

  const [register, setRegister] = useRecoilState<RegisterForm>(recoilRegister);

  const phoneInputRef = useRef<TextInput>(null);

  const onSubmit = (data: {phone: string}) => {
    if (cooldownList.includes(data.phone)) {
      setCooldownError(true);
      console.log('쿨타임 입니다!');
    } else {
      setCooldownList([...cooldownList, data.phone]);
      addCooldownWithTimer(data.phone);
      setRegister({
        ...register,
        phoneNumber: data.phone,
      });
      sendSMSMutation.mutate(data.phone);
    }
  };
  const [isloaded] = useTimer(10);
  useEffect(() => {
    if (isloaded) {
      phoneInputRef.current?.focus();
    }
  }, [isloaded]);

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
          <View style={[{marginHorizontal: 16}]}>
            <RegisterTitleView title="전화번호를 입력해주세요." />

            <View style={[{flexDirection: 'row'}]}>
              <RegisterTextinput
                ref={phoneInputRef}
                formData={formData}
                placeholder={'전화번호를 입력해주세요'}
                keyboardType={'number-pad'}
                maxLength={13}
                fieldKey="phone"
                autoFocus={false}
                rules={{required: true}}
                onSubmitEditing={formData.handleSubmit(onSubmit)}
              />
            </View>

            <View>
              {formData.formState.errors.phone?.type === 'required' && (
                <RegisterErrorText errorMessage="필수 입력사항입니다." />
              )}
              {cooldownError && (
                <RegisterErrorText errorMessage="이 번호는 잠시후에 다시 시도해주세요" />
              )}
            </View>
          </View>

          <RegisterNextButton
            onPress={formData.handleSubmit(onSubmit)}
            text="인증번호 발송"
            disabled={sendSMSMutation.isLoading || phoneInput.length === 0}
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
    width: 70,
    borderBottomWidth: 1,
    paddingVertical: 12,
    marginRight: 8,
  },
  nextButton: {
    height: 50,
    borderRadius: 10,
    marginBottom: 16,
  },
});
