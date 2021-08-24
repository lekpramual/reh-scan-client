import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IpserviceService } from '../service/ipservice.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private apiURL: IpserviceService) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
      SecretKey: this.apiURL.getSecretKey()
    })
  }

  // getUsers(search) {
  //   return this.http.get<any>(this.apiURL.getIPAddress() + '//api/user/show?search=' + search, this.httpOptions)
  //     .toPromise()
  //     .then(res =>
  //       // console.log(res);
  //       <HosxpList[]>res.data
  //     )
  //     .then(data => {
  //       return data;
  //     });
  // }

  getUsers() {
    return this.http.get<any>('../../assets/users.json')
      .toPromise()
      .then(res => <any[]>res.data)
      .then(data => { return data; });
  }
}
