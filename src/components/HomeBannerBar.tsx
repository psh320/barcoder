import React, {FC, ReactNode} from 'react';
import {StyleSheet, View} from 'react-native';
import {SCREEN_WIDTH} from '../constants';

type HomeBannerBarProps = {
  children?: ReactNode;
  totalLength: number;
  bannerIndex: number;
};

export const HomeBannerBar: FC<HomeBannerBarProps> = ({
  totalLength,
  bannerIndex,
}) => {
  const barWidth = SCREEN_WIDTH / totalLength - 16;
  const arr = Array.apply(null, Array(totalLength)).map(function (x, i) {
    return i;
  });

  const renderProgressBar = () => {
    return arr.map((item, index) => {
      if (index === bannerIndex) {
        return (
          <View
            key={index}
            style={{
              backgroundColor: '#FFFFFF',
              width: barWidth,
              height: 2,
            }}
          />
        );
      } else {
        return (
          <View
            key={index}
            style={{
              height: 2,
              width: barWidth,
              backgroundColor: '#DFDFDF50',
            }}
          />
        );
      }
    });
  };

  return (
    <View
      style={[
        {
          position: 'absolute',
          zIndex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'center',
          alignSelf: 'center',
          bottom: 16,
        },
      ]}>
      {renderProgressBar()}
    </View>
  );
};

const styles = StyleSheet.create({});
