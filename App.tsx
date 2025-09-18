/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  ImageBackground,
  Button,
} from 'react-native';

import { appStore } from './componets/stores/AppStore';

import { SafeAreaProvider } from 'react-native-safe-area-context';

function App() {
  const isDarkMode = useColorScheme() === 'dark';
  if (appStore.isLoading) {
    appStore.showWelcomeAlert();
    return (
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <AppContent />
      </SafeAreaProvider>
    );
  }
}

function AppContent() {
  return (
    <>
      <ImageBackground
        source={require('./assets/mob2.jpg')}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.container}>
          <Button title="Поиск" />
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  image: {
    height: '100%',
    justifyContent: 'center',
  },
});

export default App;
