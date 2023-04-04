import 'react-native-reanimated';
import React from 'react';
import {SafeAreaView, StyleSheet, View} from 'react-native';
import {QueryClient, QueryClientProvider} from 'react-query';
import {RecoilRoot} from 'recoil';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackScreen} from './src/nav/RootStackScreen';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <NavigationContainer>
          <SafeAreaProvider style={{backgroundColor: '#FFFFFF'}}>
            <RootStackScreen />
          </SafeAreaProvider>
        </NavigationContainer>
      </RecoilRoot>
    </QueryClientProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
