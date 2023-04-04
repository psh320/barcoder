import {useNavigation} from '@react-navigation/native';
import React, {useMemo, useState} from 'react';
import {
  Animated,
  FlatList,
  Image,
  NativeScrollEvent,
  NativeSyntheticEvent,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useQuery} from 'react-query';
import {useRecoilValue} from 'recoil';
import {getScanItemList, getTopItemList} from '../api';
import {BannerOneModal} from '../components/BannerOneModal';
import {BannerTwoModal} from '../components/BannerTwoModal';
import {HomeBannerBar} from '../components/HomeBannerBar';
import {HomePopularList} from '../components/HomePopularList';
import {HomeScanList} from '../components/HomeScanList';
import {ItemCard} from '../components/ItemCard';
import {SCREEN_WIDTH} from '../constants';
import {recoilLogin} from '../state';

/**
 * 홈 화면
 */
export const Home = () => {
  const [searchText, setSearchText] = useState('');
  const [showPopular, setShowPopular] = useState(true);
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const navigation = useNavigation();
  const animX = useMemo(() => new Animated.Value(1), []);
  const login = useRecoilValue(recoilLogin);

  const topItemList = useQuery('TopItemList', getTopItemList);
  const scanList = useQuery(['scanList', login.userId], () =>
    getScanItemList(login.userId),
  );
  console.log(topItemList.data);
  const searchSubmit = () => {
    // setSearchHistory();
    navigation.navigate('Search', {search: searchText});
  };
  const _onScrollHandler = ({
    nativeEvent: {
      contentOffset: {x},
    },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    animX.setValue(x);
  };
  const _onScrollEndHandler = ({
    nativeEvent: {
      contentOffset: {x},
    },
  }: NativeSyntheticEvent<NativeScrollEvent>) => {
    setCurrentBannerIndex(Math.floor(x / SCREEN_WIDTH));
  };

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View style={[styles.HomeHeader]}>
        <View style={{marginRight: 8}}>
          <Image
            source={require('../asset/logo.png')}
            style={{width: 70, height: 23}}
          />
        </View>
        <View
          style={{
            flex: 1,
            marginRight: 4,
            flexDirection: 'row',
            backgroundColor: '#E4E8F0',
            paddingVertical: 7,
            paddingHorizontal: 13,
            borderRadius: 17,
          }}>
          <Image
            source={require('../asset/searchIcon.png')}
            style={{width: 16, height: 16, marginRight: 8}}
          />

          <TextInput
            style={{flex: 1, height: 18}}
            placeholder="궁금한 상품이름 검색"
            returnKeyType="search"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={searchSubmit}
          />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('MyPage')}>
          <Image
            source={require('../asset/profileIcon.png')}
            style={{width: 24, height: 24}}
          />
        </TouchableOpacity>
      </View>

      <View style={{flex: 1}}>
        <ScrollView
          stickyHeaderIndices={[1]}
          showsVerticalScrollIndicator={false}>
          <View>
            <HomeBannerBar totalLength={2} bannerIndex={currentBannerIndex} />
            <ScrollView
              horizontal
              onScroll={_onScrollHandler}
              onMomentumScrollEnd={_onScrollEndHandler}
              scrollEventThrottle={16}
              bounces={false}
              snapToInterval={SCREEN_WIDTH}
              decelerationRate={0.9}
              style={{flexDirection: 'row'}}
              contentContainerStyle={{
                width: SCREEN_WIDTH * 2,
                height: SCREEN_WIDTH * 0.592,
              }}
              showsHorizontalScrollIndicator={false}>
              <TouchableOpacity
                onPress={() => navigation.navigate('BannerOne')}
                activeOpacity={0.9}>
                <Image
                  source={require('../asset/banner1.png')}
                  style={{
                    width: SCREEN_WIDTH,
                    height: SCREEN_WIDTH * 0.592,
                  }}
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate('BannerTwo')}
                activeOpacity={0.9}>
                <Image
                  source={require('../asset/banner2.png')}
                  style={{
                    width: SCREEN_WIDTH,
                    height: SCREEN_WIDTH * 0.592,
                  }}
                />
              </TouchableOpacity>
            </ScrollView>
          </View>
          <View style={{width: '100%', height: 50, backgroundColor: '#FFFFFF'}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignItems: 'center',
                marginHorizontal: 16,
              }}>
              <TouchableOpacity
                onPress={() => {
                  setShowPopular(true);
                }}
                style={[
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50,
                    flex: 1,
                  },
                  showPopular
                    ? {borderBottomColor: '#000000', borderBottomWidth: 1}
                    : {borderBottomColor: '#BBBED0', borderBottomWidth: 1},
                ]}>
                <Text
                  style={[
                    showPopular
                      ? {color: '#000000', fontWeight: '600'}
                      : {color: '#BBBED0', fontWeight: '300'},
                  ]}>
                  인기목록
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setShowPopular(false);
                }}
                style={[
                  {
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: 50,
                    flex: 1,
                  },
                  showPopular
                    ? {borderBottomColor: '#BBBED0', borderBottomWidth: 1}
                    : {borderBottomColor: '#000000', borderBottomWidth: 1},
                ]}>
                <Text
                  style={[
                    showPopular
                      ? {color: '#BBBED0', fontWeight: '300'}
                      : {color: '#000000', fontWeight: '600'},
                  ]}>
                  스캔한 목록
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          {showPopular ? (
            <HomePopularList
              itemList={topItemList.data}
              navigation={navigation}
            />
          ) : (
            <HomeScanList scanList={scanList.data} navigation={navigation} />
          )}
        </ScrollView>
      </View>

      <View
        style={[
          {
            position: 'absolute',
            bottom: 50,
            right: 32,
            width: 60,
            height: 60,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'white',
          },
          styles.shadowProp,
        ]}>
        <TouchableOpacity
          style={{
            width: 60,
            height: 60,
            borderRadius: 30,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => {
            navigation.navigate('Scanner');
          }}>
          <Image
            source={require('../asset/logoImage.png')}
            style={{width: 25, height: 20}}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  HomeHeader: {
    height: 70,
    marginHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
  },
  shadowProp: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,

    elevation: 6,
  },
});
