import React, {FC, ReactNode} from 'react';
import {StyleSheet, Text} from 'react-native';

type RegisterErrorTextProps = {
  children?: ReactNode;
  errorMessage: string;
};

export const RegisterErrorText: FC<RegisterErrorTextProps> = ({
  errorMessage,
}) => {
  return (
    <Text
      style={[
        {
          marginTop: 16,
          color: 'red',
          fontSize: 12,
          lineHeight: 14,
        },
      ]}>
      {errorMessage}
    </Text>
  );
};

const styles = StyleSheet.create({});
