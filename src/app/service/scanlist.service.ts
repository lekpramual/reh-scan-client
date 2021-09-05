import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IpserviceService } from '../service/ipservice.service';


@Injectable({
  providedIn: 'root'
})
export class ScanlistService {

  constructor(private http: HttpClient, private apiURL: IpserviceService) { }

  // Http Options
  httpOptions = {
    headers: new HttpHeaders({
      "Access-Control-Allow-Origin": "*",
      "Content-type": "application/json",
      SecretKey: this.apiURL.getSecretKey()
    })
  }

  getScanLists(search: any) {
    return this.http.get<any>(this.apiURL.getIPAddress() + '/api/scan/show?search=' + search, this.httpOptions)
      .toPromise()
      .then(data => {
        // console.log(data)
        return data;
      });

    // .then(res =>
    //   console.log(res);
    //   <HosxpList[]>res.data
    // )
  }

}
