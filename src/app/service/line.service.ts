import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LineService {

  constructor() {
    // this.getLiffLine();
  }

  getUserValue() {
    return JSON.parse(localStorage.getItem("currentLine")!);
  }
  getCurrentUserValue() {
    return JSON.parse(localStorage.getItem("currentUser")!);
  }

  getUserIsLogin() {
    if (this.getUserValue()) {
      return true;
    } else {
      return false;
    }
  }
  getCurrentUserIsLogin() {
    if (this.getCurrentUserValue()) {
      return true;
    } else {
      return false;
    }
  }
}
