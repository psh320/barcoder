import React, {FC, ReactNode} from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Text,
} from 'react-native';

type RegisterNextButtonProps = {
  children?: ReactNode;
  onPress?: () => void;
  text: string;
  finalButton?: boolean;
  disabled?: boolean;
};

export const RegisterNextButton: FC<RegisterNextButtonProps> = ({
  onPress,
  text,
  finalButton = false,
  disabled = false,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={finalButton ? 0 : 44 + 50}>
      <TouchableOpacity
        disabled={disabled}
        style={[
          styles.nextButton,
          disabled
            ? {backgroundColor: '#EEEEEE'}
            : {backgroundColor: '#000000'},
        ]}
        onPress={onPress}>
        <Text style={[disabled ? {color: '#AAAAAA'} : {color: '#FFFFFF'}]}>
          {text}
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  nextButton: {
    height: 50,
    borderRadius: 10,
    marginBottom: 16,
    marginHorizontal: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
