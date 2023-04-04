import React, {FC, ReactNode} from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {useRecoilValue} from 'recoil';
import {recoilLogin} from '../state';
import {ItemCard} from './ItemCard';
import {SCREEN_WIDTH} from '../constants';
import {Item} from '../types';
const ITEM_SIZE = (SCREEN_WIDTH - 58) / 3;
type HomeScanListProps = {
  children?: ReactNode;
  scanList: Item[] | undefined;
  navigation: any;
};

/**
 * 함수 설명
 *
 * @param {any} example 함수가 받는 파라 미터 설명
 * @returns 리턴 설명
 */
export const HomeScanList: FC<HomeScanListProps> = ({scanList, navigation}) => {
  const login = useRecoilValue(recoilLogin);
  if (!scanList) {
    return (
      <View>
        <Text style={{color: '#000000'}}>loading...</Text>
      </View>
    );
  }
  return (
    <View>
      {login.isLogin ? (
        scanList.length === 0 ? (
          <View
            style={{
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '800',
                color: '#363636',
                lineHeight: 24,
              }}>
              아직 스캔한 바코드가 없어요!
            </Text>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '800',
                color: '#363636',
                lineHeight: 24,
              }}>
              바코드를 스캔해보세요!
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              flexWrap: 'wrap',
              marginHorizontal: 16,
              marginTop: 32,
            }}>
            {scanList.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() =>
                    navigation.navigate('Product', {url: item.barcodeNumber})
                  }>
                  <View
                    style={[
                      index % 3 !== 2 && {
                        marginRight: 12,
                        width: ITEM_SIZE,
                        marginBottom: 22,
                      },
                    ]}>
                    <ItemCard itemData={item} size={ITEM_SIZE} />
                  </View>
                </TouchableOpacity>
              );
            })}
          </View>
        )
      ) : (
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            height: 300,
          }}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#363636',
              lineHeight: 20,
            }}>
            지금 로그인해서 내가 스캔한
          </Text>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#363636',
              lineHeight: 20,
            }}>
            목록을 모아보세요!
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Image
              source={require('../asset/loginButton.png')}
              style={{marginTop: 16, width: 222, height: 50, borderRadius: 10}}
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({});
