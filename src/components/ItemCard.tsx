import React, {FC, ReactNode} from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {Item} from '../types';

type ItemCardProps = {
  children?: ReactNode;
  itemData: Item;
  size: number;
};

export const ItemCard: FC<ItemCardProps> = ({itemData, size}) => {
  return (
    <View
      style={{
        backgroundColor: '#FFFFFF',
        width: size,
      }}>
      <Image
        source={{uri: itemData.itemImage}}
        style={{width: size, height: size, borderRadius: 10}}
      />
      <View style={{marginTop: 8}}>
        <View>
          <Text
            style={{fontSize: 12, color: '#000000', fontWeight: '600'}}
            numberOfLines={1}>
            {itemData.brandName}
          </Text>
        </View>
        <View>
          <Text
            style={{fontSize: 12, color: '#80849A', fontWeight: '500'}}
            numberOfLines={1}>
            {itemData.itemName}
          </Text>
        </View>
        <View>
          <Text style={{fontSize: 12, color: '#6201FF', fontWeight: '600'}}>
            {itemData.itemPrice}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
