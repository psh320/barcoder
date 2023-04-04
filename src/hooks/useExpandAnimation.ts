import {useRef, useState} from 'react';

import {Animated} from 'react-native';
import {useStyle} from './useStyle';

export const useExpandAnimation = (): [object, () => void, () => void] => {
  const height = useRef(new Animated.Value(0)).current;

  const animatedStyle = useStyle({
    height: height,
  });
  console.log(height);

  const open = () => {
    console.log('open');
    Animated.timing(height, {
      toValue: 200,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  const close = () => {
    console.log('close');
    Animated.timing(height, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };
  return [animatedStyle, open, close];
};
