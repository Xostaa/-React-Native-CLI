export interface Shift {
  logo: string;
  address: string;
  companyName: string;
  dateStartByCity: string;
  timeStartByCity: string;
  timeEndByCity: string;
  currentWorkers: string;
  planWorkers: string;
  workTypes: string;
  priceWorker: string;
  customerFeedbacksCount: string;
  customerRating: string;
}

const API_BASE_URL = 'https://mobile.handswork.pro/api';

export const apiService = {
  getShiftDate: async (latitube: number, longitube: number) => {
    try {
      const responce = await fetch(
        `${API_BASE_URL}/shift/map-list-unauthorized?latitube=${latitube}&longitube=${longitube}`,
      );
      if (!responce.ok) {
        throw new Error(`Http error! status: ${responce.status}`);
      }
      const data = responce.json();
      console.log(data)
      return data;
    } catch (error) {
      console.log('API Error:', error);
      throw error;
    }
  },
};
