import React, {ComponentProps} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {FC} from 'react';

type AuthCharViewProps = ComponentProps<typeof View> & {
  char: string | undefined;
};
export const AuthCharView: FC<AuthCharViewProps> = ({char, ...props}) => {
  let isCharValue = char !== undefined;
  return (
    <View
      {...props}
      style={[
        styles.authCharContainer,
        isCharValue
          ? {borderBottomColor: '#000000'}
          : {borderBottomColor: '#D1D1D3'},
      ]}>
      <Text
        style={[
          {fontSize: 24},
          isCharValue ? {color: '#000000'} : {color: '#EEEEEE'},
        ]}>
        {char}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  authCharContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomWidth: 1,
    width: 48,
    height: 60,
    paddingVertical: 13,
    backgroundColor: 'white',
  },
});
