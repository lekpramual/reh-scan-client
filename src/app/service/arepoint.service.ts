import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ArepointService {

  constructor() { }

  arePointsNear(checkPoint: { lat: number; lng: number; }, centerPoint: { lat: number; lng: number; }) {
    var ky = 4000 / 360;
    var kx = Math.cos((Math.PI * centerPoint.lat) / 180.0) * ky;
    var dx = Math.abs(centerPoint.lng - checkPoint.lng) * kx;
    var dy = Math.abs(centerPoint.lat - checkPoint.lat) * ky;

    console.log(dx * dx);
    console.log(dy * dy)
    console.log(dx * dx + dy * dy)
    console.log(Math.sqrt(dx * dx + dy * dy) <= 1);
    return Math.sqrt(dx * dx + dy * dy) <= 0.2;
  }
}
