import { Shift } from '../../tapy/Shift';

const API_BASE_URL = 'https://mobile.handswork.pro/api';

export const apiService = {
  getShiftData: async (
    latitude?: number,
    longitude?: number,
  ): Promise<Shift[]> => {
    try {
      const responce = await fetch(
        `${API_BASE_URL}/shifts/map-list-unauthorized?latitude=55.7558&longitude=37.6176`,
      );
      //на релизи сделай ${API_BASE_URL}/shifts/map-list-unauthorized?latitude=${latitude}&longitude=${longitude}
      if (!responce.ok) {
        throw new Error(`Http error! status: ${responce.status}`);
      }
      const { data: shifts, status } = await responce.json();
      console.log(status);
      return shifts;
    } catch (error) {
      console.log('API Error:', error);
      throw error;
    }
  },
};
