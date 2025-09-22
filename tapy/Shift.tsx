export interface Shift {
  id: string;
  logo: string;
  address: string;
  companyName: string;
  dateStartByCity: string;
  timeStartByCity: string;
  timeEndByCity: string;
  currentWorkers: string;
  planWorkers: string;
  workTypes: {
    id: string,
    name: string,
    nameGt5: string,
    nameLt5: string,
    nameOne: string,
  }[];
  priceWorker: string;
  customerFeedbacksCount: string;
  customerRating: string;
}

export type Shifts = Shift[]