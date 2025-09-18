import { makeAutoObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { location } from '../geolocation/geolocation';

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
        this.showWelcomeAlert();
      }
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
        this.isFirstLaunch = false;
      });
    }
  };

  showWelcomeAlert = () => {
    location.requestLocationPermission();
    location.getCurrentLocation();
    AsyncStorage.setItem('@app_launched', 'true');

    runInAction(() => {
      this.isFirstLaunch = false;
    });
  };
}

export const appStore = new AppStore();
