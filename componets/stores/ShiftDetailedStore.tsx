import { makeAutoObservable } from 'mobx';

class MoreDetailed {
  expandedShiftId: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  openDetailed = (shiftId: string) => {
    this.expandedShiftId = shiftId;
  };
  closeDetailed = () => {
    this.expandedShiftId = null;
  };
  isShiftExpanded = (shiftId: string): boolean => {
    return this.expandedShiftId === shiftId;
  };
  toggleDetails = (shiftId: string) => {
    if (this.isShiftExpanded(shiftId)) {
      this.closeDetailed();
    } else {
      this.openDetailed(shiftId);
    }
  };
}

export const shiftDetailed = new MoreDetailed();
