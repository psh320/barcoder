import React, {FC, ReactNode} from 'react';
import {StyleSheet, Text, View} from 'react-native';

type TemplateProps = {
  children?: ReactNode;
};

/**
 * 함수 설명
 *
 * @param {any} example 함수가 받는 파라 미터 설명
 * @returns 리턴 설명
 */
export const Template: FC<TemplateProps> = () => {
  return (
    <View>
      <Text>Template</Text>
    </View>
  );
};

const styles = StyleSheet.create({});
