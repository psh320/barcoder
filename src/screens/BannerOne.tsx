import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, ReactNode, useState} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {SCREEN_WIDTH} from '../constants';
import {RootStackParamList} from '../nav/RootStackScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'BannerOne'>;

export const BannerOne = ({navigation}: Props) => {
  const [showModal, setShowModal] = useState(false);
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
      <ScrollView>
        <Image
          source={require('../asset/longbanner1-1.png')}
          style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH * (536 / 375)}}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setShowModal(true)}>
          <Image
            source={require('../asset/longbanner1-2.png')}
            style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH * (93 / 375)}}
          />
        </TouchableOpacity>
        <Image
          source={require('../asset/longbanner1-3.png')}
          style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH * (205 / 375)}}
        />
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setShowModal(true)}>
          <Image
            source={require('../asset/longbanner1-4.png')}
            style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH * (167 / 375)}}
          />
        </TouchableOpacity>
        <Image
          source={require('../asset/longbanner1-5.png')}
          style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH * (231 / 375)}}
        />
      </ScrollView>
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
          <TouchableOpacity
            onPress={() => setShowModal(false)}
            style={{position: 'absolute', top: 8, right: 8}}>
            <Image
              source={require('../asset/close.png')}
              style={{width: 24, height: 24}}
            />
          </TouchableOpacity>

          <View
            style={{
              flexDirection: 'column',
              alignItems: 'center',
              marginHorizontal: 60,
              marginVertical: 40,
            }}>
            <Image
              source={require('../asset/info.png')}
              style={{width: 24, height: 24, marginBottom: 8}}
            />
            <View style={{flexDirection: 'row'}}>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '500',
                  color: 'black',
                  lineHeight: 21,
                }}>
                본 쿠폰은{' '}
              </Text>
              <Text
                style={{
                  fontSize: 14,
                  fontWeight: '700',
                  color: '#6935FD',
                  lineHeight: 21,
                }}>
                4월부터
              </Text>
            </View>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: 'black',
                lineHeight: 21,
              }}>
              다운로드가 가능합니다.
            </Text>
          </View>
        </View>
      </ReactNativeModal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
