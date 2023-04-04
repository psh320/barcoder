import React, {useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {
  StyleSheet,
  TextInput,
  SafeAreaView,
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

export const RegisterName = () => {
  const [register, setRegister] = useRecoilState<RegisterForm>(recoilRegister);
  const formData = useForm({
    mode: 'onChange',
    defaultValues: {
      name: '',
    },
  });
  let nameInput = formData.getValues('name');

  const onSubmit = (data: {name: string}) => {
    console.log(data);
    setRegister({...register, name: data.name});
    navigation.navigate('RegisterEmail');
  };

  const [isloaded] = useTimer(10);
  const nameInputRef = useRef<TextInput>(null);
  useEffect(() => {
    if (isloaded) {
      nameInputRef.current?.focus();
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
            <RegisterTitleView title="이름을 입력해주세요." />

            <View style={[{flexDirection: 'row'}]}>
              <RegisterTextinput
                ref={nameInputRef}
                formData={formData}
                placeholder="이름을 입력해주세요"
                maxLength={20}
                fieldKey="name"
                keyboardType="default"
                rules={{required: true}}
                onSubmitEditing={formData.handleSubmit(onSubmit)}
              />
            </View>

            {formData.formState.errors.name?.type === 'required' && (
              <RegisterErrorText errorMessage="필수 입력사항입니다." />
            )}
          </View>

          <RegisterNextButton
            onPress={formData.handleSubmit(onSubmit)}
            text="다음으로"
            disabled={nameInput.length === 0}
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
