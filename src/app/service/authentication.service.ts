import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';


import { User } from '../domain/user';
import { IpserviceService } from '../service/ipservice.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {


  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(
    private http: HttpClient,
    private apiURL: IpserviceService
  ) {
    // this.getUserValue();
    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser")!)
    );

    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    this.getUserValue();
    return this.currentUserSubject.value;
  }

  getUserValue() {
    return this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem("currentUser")!)
    );
  }
}
