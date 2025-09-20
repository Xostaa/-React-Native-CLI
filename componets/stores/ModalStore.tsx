import { makeAutoObservable } from 'mobx';

class ModalStore {
  status: boolean = false;
  constructor() {
    makeAutoObservable(this);
  }
  open = () => {
    this.status = true;
  };
  closs = () => {
    this.status = false;
  };
}

export const modalStore = new ModalStore();
