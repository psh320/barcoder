import React, {ReactNode} from 'react';
import type {FC, ComponentProps} from 'react';

import {StyleSheet, Text, View} from 'react-native';

export type RegisterTitleViewProps = ComponentProps<typeof View> & {
  children?: ReactNode;
  title: string;
};

export const RegisterTitleView: FC<RegisterTitleViewProps> = ({
  title,
  children,
  ...props
}) => {
  return (
    <View style={[{marginBottom: 64, marginTop: 16}]} {...props}>
      <Text style={[styles.registerTitle]}>{title}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  registerTitle: {
    fontSize: 24,
    lineHeight: 30,
    color: '#000000',
  },
});
