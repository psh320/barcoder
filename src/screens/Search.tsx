import {useNavigation} from '@react-navigation/native';
import React, {FC, ReactNode, useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {RootStackParamList} from '../nav/RootStackScreen';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {useQuery} from 'react-query';
import {getSearchList} from '../api';
import {ItemCard} from '../components/ItemCard';
import {SCREEN_WIDTH} from '../constants';
import {Item} from '../types';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;
const ITEM_SIZE = (SCREEN_WIDTH - 58) / 3;
/**
 * 함수 설명
 *
 * @param {any} example 함수가 받는 파라 미터 설명
 * @returns 리턴 설명
 */
export const Search = ({route}: Props) => {
  const navigation = useNavigation();
  const [searchText, setSearchText] = useState(route.params.search);
  const [isLoading, setIsLoading] = useState(true);
  // const searchList = useQuery(['searchResult', searchText], () =>
  //   getSearchList(searchText),
  // );
  const searchSubmit = () => {
    setIsLoading(true);
    async function fetchData() {
      const response = await getSearchList(searchText);
      console.log(response);
      setSearchResult(response);
    }
    fetchData();
    setIsLoading(false);
  };
  const [searchResult, setSearchResult] = useState<Item[]>([]);
  useEffect(() => {
    async function fetchData() {
      if (searchText !== '') {
        const response = await getSearchList(searchText);
        console.log(response);
        setSearchResult(response);
      }
    }
    fetchData();
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <ActivityIndicator />;
  }

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#FFFFFF'}}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginHorizontal: 16,
          height: 70,
          borderBottomColor: '#E4E8F0',
          borderBottomWidth: 1,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require('../asset/backIcon.png')}
            style={{width: 24, height: 24, marginRight: 8}}
          />
        </TouchableOpacity>
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
            placeholder="제품명, 브랜드명으로 검색"
            returnKeyType="search"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={searchSubmit}
          />
        </View>
      </View>

      {searchResult.length === 0 ? (
        <View
          style={{
            flex: 0.7,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={require('../asset/searchNotFound.png')}
              style={{width: 134, height: 142, marginBottom: 25}}
            />
            <Text
              style={{
                fontSize: 16,
                fontWeight: '500',
                color: '#BBBED0',
                lineHeight: 24,
              }}>
              검색결과가 없어요.
            </Text>
          </View>
        </View>
      ) : (
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginHorizontal: 16,
            marginTop: 32,
          }}>
          {searchResult.map((item, index) => {
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
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
