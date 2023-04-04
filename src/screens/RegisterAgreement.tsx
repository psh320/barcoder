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
import {RegisterTitleView} from '../components/RegisterTitleView';
import {RegisterNextButton} from '../components/RegisterNextButton';
import {useMutation} from 'react-query';
import {postRegisterUser} from '../api';
import {RegisterAgreementCheckView} from '../components/RegisterAgreementCheckView';
import {AGREEMENT_TEXT} from '../constants';

export const RegisterAgreement = () => {
  const [register, setRegister] = useRecoilState<RegisterForm>(recoilRegister);
  const [checkAll, setCheckAll] = useState(false);
  const [isTermsOpen, setIsTermsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const navigation = useNavigation();

  const registerUserMutation = useMutation(
    (registerData: RegisterForm) => postRegisterUser(registerData),
    {
      onSuccess: data => {
        console.log('회원가입 성공: ', data);
        navigation.navigate('Login');
      },
      onError: err => {
        console.log('회원가입 실패: ', err);
      },
    },
  );

  const checkTermsOfService = () => {
    setRegister({
      ...register,
      termsOfService: !register.termsOfService,
    });
  };
  const onPressTerms = () => {
    if (isTermsOpen !== true) {
      setIsPrivacyOpen(false);
    }
    setIsTermsOpen(!isTermsOpen);
  };

  const checkPrivacyPolicy = () => {
    setRegister({
      ...register,
      privacyPolicy: !register.privacyPolicy,
    });
  };
  const onPressPrivacy = () => {
    if (isPrivacyOpen !== true) {
      setIsTermsOpen(false);
    }
    setIsPrivacyOpen(!isPrivacyOpen);
  };

  console.log(register);
  useEffect(() => {
    if (register.termsOfService && register.privacyPolicy) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
    if (register.termsOfService && register.privacyPolicy) {
      setCheckAll(true);
    } else {
      setCheckAll(false);
    }
  }, [register.privacyPolicy, register.termsOfService]);

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
            <RegisterTitleView
              title="이용약관에 동의해주세요."
              style={{marginBottom: 32}}
            />

            <View style={[{flexDirection: 'row'}]}>
              <TouchableOpacity
                style={[
                  {
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    borderBottomWidth: 1,
                    paddingVertical: 12,
                    flexDirection: 'row',
                  },
                  checkAll
                    ? {borderBottomColor: '#000000'}
                    : {borderBottomColor: '#DFDFDF'},
                ]}
                onPress={() => {
                  setCheckAll(!checkAll);
                  setRegister({
                    ...register,
                    termsOfService: !checkAll,
                    privacyPolicy: !checkAll,
                    internationalTransfer: !checkAll,
                  });
                }}>
                <View
                  style={{
                    borderWidth: 1,
                    borderColor: '#DFDFDF',
                    borderRadius: 20,
                    width: 20,
                    height: 20,
                    backgroundColor: checkAll ? '#000000' : '#FFFFFF',
                  }}
                />
                <Text
                  style={[
                    {fontSize: 16, marginLeft: 8},
                    checkAll ? {color: '#000000'} : {color: '#DFDFDF'},
                  ]}>
                  모두 동의합니다
                </Text>
              </TouchableOpacity>
            </View>

            <RegisterAgreementCheckView
              onPressCheck={checkTermsOfService}
              onPressText={onPressTerms}
              isOpen={isTermsOpen}
              isChecked={register.termsOfService}
              text="이용약관 동의"
              isCompulsory={true}
              style={[{marginTop: 32}]}>
              <Text style={{color: '#000000'}}>
                {AGREEMENT_TEXT.useAgreement}
              </Text>
            </RegisterAgreementCheckView>

            <RegisterAgreementCheckView
              onPressCheck={checkPrivacyPolicy}
              onPressText={onPressPrivacy}
              isOpen={isPrivacyOpen}
              isChecked={register.privacyPolicy}
              text="개인정보 수집 및 이용 동의"
              isCompulsory={true}
              style={[{marginTop: 16}]}>
              <Text style={{color: '#000000'}}>
                {AGREEMENT_TEXT.privacyAgreement}
              </Text>
            </RegisterAgreementCheckView>
          </View>

          <RegisterNextButton
            onPress={() => {
              registerUserMutation.mutate(register);
            }}
            text="다음으로"
            finalButton={true}
            disabled={registerUserMutation.isLoading || buttonDisabled}
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
