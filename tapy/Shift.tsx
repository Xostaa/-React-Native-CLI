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

export type Shifts = Shift[]