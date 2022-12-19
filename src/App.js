import {LogBox, StatusBar, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NativeBaseProvider} from 'native-base';
import MainStack from './Navigation/MainStack';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import store from './Store';
import Toast from 'react-native-toast-message';

LogBox.ignoreAllLogs();
export default function App() {
  return (
    <Provider {...{store}}>
      <SafeAreaProvider>
        <NativeBaseProvider>
          <StatusBar backgroundColor={'#004AAC'} />
          <MainStack />

          <Toast />
        </NativeBaseProvider>
      </SafeAreaProvider>
    </Provider>
  );
}
