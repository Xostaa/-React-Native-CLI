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
/* import { apiService } from './componets/Services/api'; */
import { SafeAreaProvider } from 'react-native-safe-area-context';
/* import { location } from './componets/geolocation/LocationStore'; */
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

function AppContent() {
  return (
    <>
      <ImageBackground
        source={require('./assets/mob2.jpg')}
        resizeMode="cover"
        style={styles.image}
      >
        <View style={styles.container}>
          <Button title="Доступные смены" />
        </View>
      </ImageBackground>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    marginVertical: 30,
    flexDirection: 'column-reverse',
  },
  image: {
    height: '100%',
    justifyContent: 'center',
  },
});

export default App;
