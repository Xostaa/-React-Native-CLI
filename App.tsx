/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React from 'react';
import { observer } from 'mobx-react-lite';
import {
  StatusBar,
  useColorScheme,
  View,
  ActivityIndicator,
} from 'react-native';

import { appStore } from './componets/Stores/AppStore';
import { locationStore } from './componets/Geolocation/LocationStore';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Main } from './componets/Main/Main';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  if (appStore.isLoading) {
    appStore.showCords();
    return (
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
      </SafeAreaProvider>
    );
  }
}

const AppContent = observer(() => {
  if (locationStore.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <>
      <Main />
    </>
  );
});

export default App;
