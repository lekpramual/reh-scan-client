import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { IpserviceService } from '../service/ipservice.service';
import { Scan } from '../domain/scan';


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

  createPost(post: any) {
    console.log(post)
    // .then(res =>
    //   <Scan[]>res
    // )
    return this.http.post<any>(this.apiURL.getIPAddress() + '/api/scan/create', JSON.stringify(post), this.httpOptions)
      .toPromise()
      .then(data => {

        return data.msg;
      });
  }



  // const data = {
  //   userId: Auth.getProfile().id,
  //   checkType: msg === "chkin" ? "0" : "1",
  //   scanId: location
  // };

  // export function createScanInOut(data) {
  //   return (dispatch) => {
  //     dispatch(createBegin());
  //     return axios
  //       .post(`${ApiServiceHeroku}/api/scan/create`, data, {
  //         headers: {
  //           "Access-Control-Allow-Origin": "*",
  //           "Content-type": "application/json",
  //           SecretKey: SecretKey
  //         }
  //       })
  //       .then((res) => {
  //         var data = [];
  //         data.push(res.data);
  //         dispatch(createSuccess(data));
  //         console.log(data);
  //         return data;
  //       })
  //       .catch((error) => dispatch(createFailure(error)));
  //   };
  // }

}
