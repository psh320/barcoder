import React, {ReactNode, useEffect} from 'react';
import type {FC, ComponentProps} from 'react';

import {Animated, StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import {useExpandAnimation} from '../hooks/useExpandAnimation';

export type RegisterAgreementCheckViewProps = ComponentProps<typeof View> & {
  children?: ReactNode;
  onPressCheck: () => void;
  onPressText: () => void;
  isOpen: boolean;
  isChecked: boolean;
  text: string;
  isCompulsory?: boolean;
};

export const RegisterAgreementCheckView: FC<
  RegisterAgreementCheckViewProps
> = ({
  onPressCheck,
  onPressText,
  isOpen,
  isChecked,
  children,
  text,
  isCompulsory,
  ...props
}) => {
  const [animatedStyle, open, close] = useExpandAnimation();

  useEffect(() => {
    if (isOpen) {
      open();
    } else {
      close();
    }
  }, [isOpen]);

  return (
    <View {...props}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={{width: 20, height: 20}}
          onPress={onPressCheck}>
          <View
            style={{
              borderWidth: 1,
              borderColor: '#DFDFDF',
              borderRadius: 16,
              width: 16,
              height: 16,
              backgroundColor: isChecked ? '#000000' : '#FFFFFF',
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            marginLeft: 8,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          onPress={onPressText}>
          <View
            style={{
              borderBottomColor: '#2F2F2F',
              borderBottomWidth: 1,
              paddingVertical: 2,
            }}>
            <Text
              style={[
                {
                  fontSize: 14,
                  color: '#2F2F2F',
                },
              ]}>
              {text}
            </Text>
          </View>
          {isCompulsory && (
            <Text
              style={[
                {
                  fontSize: 14,
                  color: '#000000',
                  marginLeft: 4,
                },
              ]}>
              (필수)
            </Text>
          )}
        </TouchableOpacity>
      </View>

      <Animated.ScrollView
        style={[
          {
            width: '100%',
            backgroundColor: '#EEEEEE',
            borderRadius: 8,
            marginTop: 8,
          },
          animatedStyle,
        ]}
        contentContainerStyle={[{paddingHorizontal: 20, paddingVertical: 15}]}>
        {children}
      </Animated.ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  registerTitle: {
    fontFamily: 'Pretendard-Medium',
    fontSize: 24,
    lineHeight: 30,
  },
});
