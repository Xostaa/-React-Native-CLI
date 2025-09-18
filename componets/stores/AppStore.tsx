import { makeAutoObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { location } from '../geolocation/LocationStore';
import { Alert } from 'react-native';

class AppStore {
  isFirstLaunch: boolean | null = null;
  isLoading: boolean = true;

  constructor() {
    makeAutoObservable(this);
    this.checkFirstLaunch();
  }

  // Action для проверки первого запуска
  checkFirstLaunch = async () => {
    try {
      const hasLaunched = await AsyncStorage.getItem('@app_launched');

      runInAction(() => {
        this.isFirstLaunch = hasLaunched === null;
        this.isLoading = false;
      });

      if (this.isFirstLaunch) {
        this.showCords();
      }
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.isFirstLaunch = false;
      });
    }
  };

  showCords = async () => {
   await location.requestLocationPermission();
    location.getCurrentLocation(coords => {
      console.log(`Кординаты  ${coords.latitude} и ${coords.longitude}`);
      Alert.alert(`Ваши кординаты ${coords.latitude} и ${coords.longitude}`);

      AsyncStorage.setItem('@app_launched', 'true');
      runInAction(() => {
        this.isFirstLaunch = false;
      });
    });
  };
}

export const appStore = new AppStore();
