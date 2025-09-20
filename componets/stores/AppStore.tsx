import { makeAutoObservable, runInAction } from 'mobx';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { locationStore } from '../Geolocation/LocationStore';

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
    try {
      await locationStore.requestLocationPermission();

      await new Promise<void>(resolve => {
        locationStore.getCurrentLocation(() => resolve());
      });

      await AsyncStorage.setItem('@app_launched', 'true');

      runInAction(() => {
        this.isFirstLaunch = false;
      });
    } catch (error) {
      console.error('Ошибка в slowCords:', error);
    }
  };
}

export const appStore = new AppStore();
