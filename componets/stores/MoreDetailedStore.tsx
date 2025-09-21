import { makeAutoObservable } from "mobx";

class MoreDetailed {
    status: boolean = false;
      
     constructor() {
        makeAutoObservable(this);
     }

    open = () => {
      this.status = true
     
    }

    close = () => {
        this.status = false
        console.log(this.status)
    }
}

export const moreDetailed = new MoreDetailed()