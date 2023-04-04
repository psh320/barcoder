import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {FC, ReactNode} from 'react';
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {SCREEN_WIDTH} from '../constants';
import {RootStackParamList} from '../nav/RootStackScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'BannerTwo'>;

export const BannerTwo = ({navigation}: Props) => {
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
          source={require('../asset/longBanner2.png')}
          style={{width: SCREEN_WIDTH, height: SCREEN_WIDTH * (1536 / 375)}}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({});
