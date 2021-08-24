import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class IpserviceService {
    constructor(private http: HttpClient) { }
    apiURL: string = 'https://api-rehwebapp.herokuapp.com';
    public getIPAddress() {
        return this.apiURL;
    }

    public getSecretKey() {
        return "96Udcddbo9y[";
    }
}
