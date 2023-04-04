import React, {FC, ReactNode} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {ItemCard} from './ItemCard';
import {SCREEN_WIDTH} from '../constants';
import {Item} from '../types';
const ITEM_SIZE = (SCREEN_WIDTH - 58) / 3;

type HomePopularListProps = {
  children?: ReactNode;
  itemList: Item[];
  navigation: any;
};

export const HomePopularList: FC<HomePopularListProps> = ({
  itemList,
  navigation,
}) => {
  return (
    <View
      style={{
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginHorizontal: 16,
        marginTop: 32,
      }}>
      {itemList &&
        itemList.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.navigate('Product', {url: item.barcodeNumber})
              }>
              {index < 3 && (
                <View
                  style={{
                    position: 'absolute',
                    top: 5,
                    left: 5,
                    zIndex: 2,
                    backgroundColor: '#6301FF',
                    width: 21,
                    height: 21,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 12,
                  }}>
                  <Text
                    style={{color: 'white', fontWeight: '600', fontSize: 12}}>
                    {index + 1}
                  </Text>
                </View>
              )}
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
  );
};

const styles = StyleSheet.create({});
