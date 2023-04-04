import React, {forwardRef, ForwardRefRenderFunction} from 'react';
import type {ComponentProps} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import {Controller, UseFormReturn} from 'react-hook-form';

export type TextInputProps = ComponentProps<typeof TextInput> & {
  formData: UseFormReturn<any>;
  fieldKey: string;
  rules?: object;
};

export const _RegisterTextinput: ForwardRefRenderFunction<
  TextInput,
  TextInputProps
> = ({formData, fieldKey, rules, ...props}, ref) => {
  // const textInputRef = useRef<RNTextInput | null>(null);
  // useEffect(() => {
  //   textInputRef.current?.focus();
  // }, []);

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Controller
        control={formData.control}
        rules={rules}
        render={({field: {onChange, value}}) => {
          return (
            <TextInput
              ref={ref}
              style={[
                styles.registerTextInput,
                {color: '#000000'},
                value !== ''
                  ? {borderBottomColor: '#000000'}
                  : {borderBottomColor: '#C4C4C4'},
              ]}
              onChangeText={text => {
                onChange(text);
              }}
              blurOnSubmit={false}
              value={formData.watch(fieldKey)}
              placeholderTextColor="#C4C4C4"
              {...props}
            />
          );
        }}
        name={fieldKey}
      />
    </View>
  );
};

export const RegisterTextinput = forwardRef(_RegisterTextinput);

const styles = StyleSheet.create({
  registerTextInput: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  deleteInputButton: {
    width: 16,
    height: 16,
    borderRadius: 16,
    backgroundColor: '#D1D1D3',
    position: 'absolute',
    right: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
