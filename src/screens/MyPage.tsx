import {useNavigation} from '@react-navigation/native';
import React, {FC, ReactNode, useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {useMutation, useQuery} from 'react-query';
import {useRecoilState} from 'recoil';
import {deleteUser, getUserInfo, putUserInfo} from '../api';
import {recoilLogin} from '../state';
import * as Keychain from 'react-native-keychain';

/**
 * 함수 설명
 *
 * @param {any} example 함수가 받는 파라 미터 설명
 * @returns 리턴 설명
 */
export const MyPage = () => {
  const navigation = useNavigation();
  const [isEdit, setIsEdit] = useState(false);
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [showModalTwo, setShowModalTwo] = useState(false);
  const [login, setLogin] = useRecoilState(recoilLogin);
  const userInfo = useQuery(
    ['userInfo', login.userId],
    () => getUserInfo(login.userId),
    {
      onSuccess: data => {
        console.log('유저데이터', data);
        setEmail(data.email);
        setName(data.name);
        setPhoneNumber(data.phoneNumber);
      },
    },
  );

  const userMutation = useMutation(
    () => putUserInfo({email: email, name: name}),
    {
      onSuccess: data => {
        console.log(data);
      },
    },
  );

  const userDeleteMutation = useMutation(() => deleteUser(), {
    onSuccess: data => {
      console.log(data);
      setShowModalTwo(false);
      navigation.navigate('Home');
    },
  });

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
        <Text
          style={{
            fontSize: 16,
            fontWeight: '800',
            color: '#000000',
            lineHeight: 24,
          }}>
          MY
        </Text>
        <TouchableOpacity
          disabled={!login.isLogin}
          onPress={() => {
            if (isEdit) {
              userMutation.mutate();
            }
            setIsEdit(!isEdit);
          }}>
          {isEdit ? (
            <Text style={[!login.isLogin && {opacity: 0}]}>완료</Text>
          ) : (
            <Text style={[!login.isLogin && {opacity: 0}]}>수정</Text>
          )}
        </TouchableOpacity>
      </View>
      {login.isLogin ? (
        <View
          style={{
            flex: 1,
            marginHorizontal: 16,
            marginTop: 32,
            justifyContent: 'space-between',
          }}>
          <View>
            <View style={{marginBottom: 24}}>
              <Text style={{color: '#41434A', fontSize: 12, marginBottom: 4}}>
                이름
              </Text>
              <TextInput
                style={[styles.registerTextInput]}
                editable={isEdit}
                value={name}
                onChangeText={text => {
                  setName(text);
                }}
              />
            </View>
            <View style={{marginBottom: 24}}>
              <Text style={{color: '#41434A', fontSize: 12, marginBottom: 4}}>
                이메일
              </Text>
              <TextInput
                style={[styles.registerTextInput]}
                editable={isEdit}
                value={email}
                onChangeText={text => {
                  setEmail(text);
                }}
              />
            </View>
            <View style={{marginBottom: 24}}>
              <Text style={{color: '#41434A', fontSize: 12, marginBottom: 4}}>
                전화번호
              </Text>
              <TextInput
                style={[styles.registerTextInput]}
                editable={false}
                value={phoneNumber}
                onChangeText={text => {
                  setPhoneNumber(text);
                }}
              />
            </View>
          </View>
          {!isEdit && (
            <View style={{justifyContent: 'center'}}>
              <TouchableOpacity
                style={{
                  marginHorizontal: 36,
                  backgroundColor: '#000000',
                  paddingVertical: 16,
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 5,
                }}
                onPress={() => setShowModal(true)}>
                <Text style={{color: 'white', fontSize: 14, fontWeight: '600'}}>
                  로그아웃
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{
                  marginTop: 12,
                  alignItems: 'center',
                  borderRadius: 5,
                  marginHorizontal: 110,
                }}
                onPress={() => setShowModalTwo(true)}>
                <Text style={{color: '#000000'}}>회원탈퇴</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
      ) : (
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../asset/loginBox.png')}
              style={{width: 288, height: 171, marginBottom: 25}}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#363636',
                lineHeight: 27,
              }}>
              바코더의 회원이 되어서
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                color: '#363636',
                lineHeight: 27,
              }}>
              여러 혜택을 받아보세요!
            </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Image
                source={require('../asset/loginButton.png')}
                style={{
                  marginTop: 25,
                  width: 222,
                  height: 50,
                  borderRadius: 10,
                }}
              />
            </TouchableOpacity>
          </View>
        </View>
      )}

      <ReactNativeModal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={() => setShowModal(false)}
        isVisible={showModal}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 7,
          }}>
          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: 42,
              marginVertical: 24,
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../asset/info.png')}
                style={{width: 24, height: 24, marginBottom: 8}}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: 'black',
                  lineHeight: 21,
                }}>
                정말 로그아웃 하시겠습니까?
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 24,
              }}>
              <TouchableOpacity onPress={() => setShowModal(false)}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#A6A6A6',
                    lineHeight: 21,
                  }}>
                  관둘래요
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await Keychain.resetGenericPassword();
                  await setLogin({isLogin: false, userId: 0});
                  setShowModal(false);
                  navigation.navigate('Home');
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#6935FD',
                    lineHeight: 21,
                  }}>
                  로그아웃하기
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ReactNativeModal>

      <ReactNativeModal
        animationIn={'fadeIn'}
        animationOut={'fadeOut'}
        onBackdropPress={() => setShowModalTwo(false)}
        isVisible={showModalTwo}
        style={{justifyContent: 'center', alignItems: 'center'}}>
        <View
          style={{
            backgroundColor: 'white',
            borderRadius: 7,
          }}>
          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: 42,
              marginVertical: 24,
            }}>
            <View style={{alignItems: 'center'}}>
              <Image
                source={require('../asset/info.png')}
                style={{width: 24, height: 24, marginBottom: 8}}
              />
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: 'black',
                  lineHeight: 21,
                }}>
                정말 회원탈퇴 하시겠습니까?
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 24,
              }}>
              <TouchableOpacity onPress={() => setShowModalTwo(false)}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#A6A6A6',
                    lineHeight: 21,
                  }}>
                  관둘래요
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={async () => {
                  await Keychain.resetGenericPassword();
                  await setLogin({isLogin: false, userId: 0});
                  userDeleteMutation.mutate();
                }}>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: '500',
                    color: '#6935FD',
                    lineHeight: 21,
                  }}>
                  탈퇴할래요
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  registerTextInput: {
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#EAE8F0',
    fontSize: 16,
    fontWeight: '600',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
