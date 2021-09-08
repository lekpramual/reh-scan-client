import { Injectable } from '@angular/core';
import * as geolib from 'geolib';

@Injectable({
  providedIn: 'root'
})
export class ArepointService {

  constructor() { }

  testFun(checkPoint: { lat1: number; lon1: number; }, centerPoint: { lat2: number; lon2: number; }) {
    //  ตรวจสอบว่าจุดอยู่ภายในวงกลมหรือไม่
    return geolib.isPointWithinRadius({
      latitude: checkPoint.lat1,
      longitude: checkPoint.lon1,
    }, {
      latitude: centerPoint.lat2,
      longitude: centerPoint.lon2,
    }, geolib.convertDistance(100, 'm'))
    // geolib.convertDistance(10, 'm')
  }

  testFun1(checkPoint: { lat1: number; lon1: number; }, centerPoint: { lat2: number; lon2: number; }) {
    // คำนวณระยะทางระหว่างสองพิกัดทางภูมิศาสตร์
    return geolib.getPreciseDistance({
      latitude: checkPoint.lat1,
      longitude: checkPoint.lon1,
    }, {
      latitude: centerPoint.lat2,
      longitude: centerPoint.lon2,
    })
  }





}
