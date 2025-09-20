import { makeAutoObservable, runInAction } from 'mobx';
import { PermissionsAndroid, Platform } from 'react-native';
import { Shift } from '../../tapy/Shift';
import Geolocation from '@react-native-community/geolocation';
import { apiService } from '../Services/api';

export interface Location {
  latitude: number;
  longitude: number;
}

class LocationStore {
  shifts: Shift[] = [];
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

  getCurrentLocation = (coords: (location: Location) => void) => {
    this.isLoading = true;
    this.error = null;

    if (this.hasPermission) {
      Geolocation.getCurrentPosition(position => {
        runInAction(() => {
          this.currentLocation = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          };
          this.isLoading = false;
        });

        if (coords) {
          coords(this.currentLocation!);
        }
      });
    }
  };

  getShiftData = async (): Promise<Shift[]> => {
    if (!this.currentLocation) {
      throw new Error('Location not available');
    }

    this.isLoading = true;

    try {
      const shifts = await apiService.getShiftData(
        this.currentLocation.latitude,
        this.currentLocation.longitude,
      );

      runInAction(() => {
        this.shifts = shifts; // Сохраняем массив смен
        this.isLoading = false;
      });
     
      return shifts;
    } catch (error) {
      runInAction(() => {
        this.isLoading = false;
      });
      throw error;
    }
  };
}

export const locationStore = new LocationStore();
