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
  StyleSheet,
  useColorScheme,
  View,
  ImageBackground,
  Text,
  Button,
} from 'react-native';

import { appStore } from './componets/Stores/AppStore';
import { locationStore } from './componets/Geolocation/LocationStore';
import ShiftList from './componets/ShiftList/ShiftList';
import { SafeAreaProvider } from 'react-native-safe-area-context';

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
      <View style={styles.container}>
        <Text>Загрузка приложения...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('./assets/mob2.jpg')}
        resizeMode="cover"
        style={styles.image}
      >
        <ShiftList />
      </ImageBackground>
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    height: '100%',
    justifyContent: 'flex-end',
  },
});

export default App;
