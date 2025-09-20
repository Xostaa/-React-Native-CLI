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
  ActivityIndicator,
  Modal,
  Button,
} from 'react-native';
import { modalStore } from './componets/Stores/ModalStore';
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
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ImageBackground
      source={require('./assets/mob2.jpg')}
      resizeMode="cover"
      style={styles.image}
    >
      <View style={styles.container}>
          <Modal visible= {modalStore.status}>
            <ShiftList />
            <Button onPress={modalStore.closs} title="Закрыть" />
          </Modal>
        <Button onPress={modalStore.open} title="Показать смены" />
      </View>
    </ImageBackground>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    height: '100%',
  },
});

export default App;
