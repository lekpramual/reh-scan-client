import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getPosition(): Promise<any> {
    // getCurrentPosition
    return new Promise((resolve, reject) => {
      navigator.geolocation.watchPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        }, { maximumAge: 0 });
    });
  }
}
