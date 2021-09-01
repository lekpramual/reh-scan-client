import { Injectable } from '@angular/core';
import * as geolib from 'geolib';

@Injectable({
  providedIn: 'root'
})
export class ArepointService {

  constructor() { }

  testFun(checkPoint: { lat1: number; lon1: number; }, centerPoint: { lat2: number; lon2: number; }) {

    // isPointWithinRadius(point, centerPoint, radius) ตรวจสอบว่าจุดอยู่ภายในวงกลมหรือไม่
    // checks if 51.525/7.4575 is within a radius of 5 km from 51.5175/7.4678
    return geolib.isPointWithinRadius({
      latitude: checkPoint.lat1,
      longitude: checkPoint.lon1,
    }, {
      latitude: centerPoint.lat2,
      longitude: centerPoint.lon2,
    }, geolib.convertDistance(10, 'm'))

    // geolib.convertDistance(10, 'm')
  }

  testFun1(checkPoint: { lat1: number; lon1: number; }, centerPoint: { lat2: number; lon2: number; }) {

    // isPointWithinRadius(point, centerPoint, radius) ตรวจสอบว่าจุดอยู่ภายในวงกลมหรือไม่
    // checks if 51.525/7.4575 is within a radius of 5 km from 51.5175/7.4678
    return geolib.getPreciseDistance({
      latitude: checkPoint.lat1,
      longitude: checkPoint.lon1,
    }, {
      latitude: centerPoint.lat2,
      longitude: centerPoint.lon2,
    }, geolib.convertDistance(10, 'm'))
  }





}
