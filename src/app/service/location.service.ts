import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor() { }

  getPosition(): Promise<any> {
    // getCurrentPosition
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
      },
        err => {
          reject(err);
        }, { maximumAge: 0 });
    });
  }

  getLocation1(): Observable<any> {
    return Observable.create((observer: { next: (arg0: GeolocationPosition) => void; complete: () => void; error: (arg0: string | GeolocationPositionError) => void; }) => {
      if (window.navigator && window.navigator.geolocation) {
        window.navigator.geolocation.getCurrentPosition(
          (position) => {
            observer.next(position);
            observer.complete();
          },
          (error) => observer.error(error)
        );
      } else {
        observer.error('Unsupported Browser');
      }
    });
  }
}
