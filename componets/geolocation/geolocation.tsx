import { makeAutoObservable, runInAction } from 'mobx';
import { PermissionsAndroid, Platform } from 'react-native';
import { Alert } from 'react-native';

import Geolocation from '@react-native-community/geolocation';

export interface Location {
  longitude: number;
  latitude: number;
}

class LocationStore {
  currentLocation: Location | null = null;
  isLoading: boolean = false;
  error: string | null = null;
  hasPermission: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }

  requestLocationPermission = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        runInAction(() => {
          this.hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
        });
      }
    } catch (error) {
      runInAction(() => {
        this.error = 'Ошибка запроса разрешений';
      });
    }
  };

  getCurrentLocation = () => {
    this.isLoading = true;
    this.error = null;

    if (this.hasPermission) {
      Geolocation.getCurrentPosition(position => {
        runInAction(() => {
          this.currentLocation = {
            longitude: position.coords.longitude,
            latitude: position.coords.latitude,
          };
          this.isLoading = false;
        });
      });
    }
    console.log(`Ваши кординаты : ${this.currentLocation}`)
  };
}

export const location = new LocationStore();
