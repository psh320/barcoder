import * as React from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Camera,
  useCameraDevices,
  useFrameProcessor,
} from 'react-native-vision-camera';

import {StackActions} from '@react-navigation/native';
import {useScanBarcodes, BarcodeFormat} from 'vision-camera-code-scanner';
import {useNavigation} from '@react-navigation/native';
import {useMutation} from 'react-query';
import {useRecoilValue} from 'recoil';
import {recoilLogin} from '../state';
import {postScan} from '../api';

export const Scanner = () => {
  const navigation = useNavigation();
  const userId = useRecoilValue(recoilLogin);
  const [hasPermission, setHasPermission] = React.useState(false);
  const devices = useCameraDevices('wide-angle-camera');
  const device = devices.back;

  const [frameProcessor, barcodes] = useScanBarcodes(
    [BarcodeFormat.EAN_13, BarcodeFormat.EAN_8],
    {
      checkInverted: true,
    },
  );

  React.useEffect(() => {
    const navigate = async (result: string) => {
      await navigation.dispatch(StackActions.replace('Product', {url: result}));
    };
    if (barcodes.length > 0) {
      const result = barcodes[0].displayValue;
      console.log(result);
      if (result) {
        navigate(result);
      }
    }
  }, [barcodes]);

  React.useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      setHasPermission(status === 'authorized');
    })();
  }, []);

  if (device == null) {
    return <ActivityIndicator size={20} color={'red'} />;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
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
            style={{width: 24, height: 24, margin: 2}}
          />
        </TouchableOpacity>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '800',
            color: '#000000',
            lineHeight: 24,
          }}>
          바코드를 스캔하세요!
        </Text>
        <TouchableOpacity style={{opacity: 0}}>
          <Image
            source={require('../asset/backIcon.png')}
            style={{width: 24, height: 24, margin: 2}}
          />
        </TouchableOpacity>
      </View>

      <Camera
        style={{flex: 1}}
        device={device}
        isActive={true}
        frameProcessor={frameProcessor}
        frameProcessorFps={1}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  barcodeText: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
});
