import { Shift } from '../../tapy/Shift';

const API_BASE_URL = 'https://mobile.handswork.pro/api';

export const apiService = {
  getShiftData: async (
    latitude?: number,
    longitude?: number,
  ): Promise<Shift[]> => {
    try {
      const responce = await fetch(
        `${API_BASE_URL}/shifts/map-list-unauthorized?latitude=${latitude}&longitude=${longitude}`,
      );
      if (!responce.ok) {
        throw new Error(`Http error! status: ${responce.status}`);
      }
      const data: Shift[] = await responce.json();
      return data;
    } catch (error) {
      console.log('API Error:', error);
      throw error;
    }
  },
};
