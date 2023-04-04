import {StackActions} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, ReactNode, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {WebView} from 'react-native-webview';
import {useMutation} from 'react-query';
import {useRecoilValue} from 'recoil';
import {postScan} from '../api';
import {SCREEN_WIDTH} from '../constants';
import {RootStackParamList} from '../nav/RootStackScreen';
import {recoilLogin} from '../state';

type Props = NativeStackScreenProps<RootStackParamList, 'Product'>;

export const Product = ({route, navigation}: Props) => {
  const userId = useRecoilValue(recoilLogin);
  const [url, setUrl] = useState('loading');
  const scanMutation = useMutation(
    (barcodeText: string) => postScan(barcodeText, userId.userId),
    {
      onSuccess: data => {
        console.log('리턴해준 데이터!!!', data);
        setUrl(data);
      },
      onError: err => {
        console.log('리턴해준 데이터 에러', err);
      },
    },
  );

  useEffect(() => {
    scanMutation.mutate(route.params.url);
  }, []);

  if (url === 'loading') {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#FFFFFF',
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            height: 40,
            borderBottomColor: '#DFDFDF',
            borderBottomWidth: 1,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../asset/backIcon.png')}
              style={{width: 24, height: 24, marginRight: 8}}
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            flex: 1,
          }}>
          <ActivityIndicator size={'small'} />
        </View>
      </SafeAreaView>
    );
  }
  if (url !== '') {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 16,
            height: 40,
            borderBottomColor: '#DFDFDF',
            borderBottomWidth: 1,
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../asset/backIcon.png')}
              style={{width: 24, height: 24, marginRight: 8}}
            />
          </TouchableOpacity>
        </View>
        <WebView
          startInLoadingState={true}
          allowsBackForwardNavigationGestures={true}
          source={{uri: url}}
          mixedContentMode={'compatibility'}
          originWhitelist={['https://*', 'http://*']}
          overScrollMode={'never'}
        />
      </SafeAreaView>
    );
  } else {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#000000',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            backgroundColor: '#FFFFFF',
            position: 'absolute',
            width: SCREEN_WIDTH - 64,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', marginTop: 60}}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: 'black',
                lineHeight: 24,
              }}>
              해당 제품은{' '}
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '700',
                color: 'black',
                lineHeight: 24,
              }}>
              입점 준비 중
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '400',
                color: 'black',
                lineHeight: 24,
              }}>
              입니다.
            </Text>
          </View>

          <Text
            style={{
              fontSize: 16,
              fontWeight: '400',
              color: 'black',
              lineHeight: 24,
            }}>
            조금만 기다려 주세요.
          </Text>
          <Image
            source={require('../asset/productNotReady.png')}
            style={{width: SCREEN_WIDTH - 64, height: 270}}
          />
          <TouchableOpacity
            style={{
              height: 46,
              backgroundColor: 'black',
              width: SCREEN_WIDTH - 110,
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 32,
            }}
            onPress={() => navigation.navigate('Home')}>
            <Text style={{color: 'white', fontWeight: '600', fontSize: 16}}>
              홈으로 돌아가기
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({});
