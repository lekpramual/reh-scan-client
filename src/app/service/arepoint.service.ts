import { Injectable } from '@angular/core';
import * as geolib from 'geolib';

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
    console.log(Math.sqrt(dx * dx + dy * dy) <= 0.1);
    return Math.sqrt(dx * dx + dy * dy) <= 0.1;
  }

  distance(checkPoint: { lat1: number; lon1: number; }, centerPoint: { lat2: number; lon2: number; }) {
    // lat1, lon1, lat2, lon2
    /* var R = 6371; // Earth's radius in Km
    return Math.acos(Math.sin(checkPoint.lat1) * Math.sin(centerPoint.lat2) +
    Math.cos(checkPoint.lat1) * Math.cos(centerPoint.lat2) *
    Math.cos(centerPoint.lon2 - checkPoint.lon1)) * R;
    */

    const lat = checkPoint.lat1 - centerPoint.lat2

    // distance(user.lat, user.lon, post.lat, post.lon) <= desiredRadiusInKm
  }

  degreesToRadians(degrees: number) {
    return degrees * Math.PI / 180;
  }

  distanceInKmBetweenEarthCoordinates(checkPoint: { lat1: number; lon1: number; }, centerPoint: { lat2: number; lon2: number; }) {

    var earthRadiusKm = 6371;

    var dLat = this.degreesToRadians(centerPoint.lat2 - checkPoint.lat1);
    var dLon = this.degreesToRadians(centerPoint.lon2 - checkPoint.lon1);

    var lat1 = this.degreesToRadians(checkPoint.lat1);
    var lat2 = this.degreesToRadians(centerPoint.lat2);

    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  }

  /**
 * Calculates the great-circle distance between two points, with
 * the Haversine formula.
 * @param float $latitudeFrom Latitude of start point in [deg decimal]
 * @param float $longitudeFrom Longitude of start point in [deg decimal]
 * @param float $latitudeTo Latitude of target point in [deg decimal]
 * @param float $longitudeTo Longitude of target point in [deg decimal]
 * @param float $earthRadius Mean earth radius in [m]
 * @return float Distance between points in [m] (same as earthRadius)
 */
  haversineGreatCircleDistance(
    checkPoint: { lat1: number; lon1: number; }, centerPoint: { lat2: number; lon2: number; }
    // $latitudeFrom, $longitudeFrom, $latitudeTo, $longitudeTo, $earthRadius = 6371000

  ) {
    // convert from degrees to radians
    var latFrom = this.degreesToRadians(checkPoint.lat1);
    var lonFrom = this.degreesToRadians(checkPoint.lon1);
    var latTo = this.degreesToRadians(centerPoint.lat2);
    var lonTo = this.degreesToRadians(centerPoint.lon2);

    var latDelta = latTo - latFrom;
    var lonDelta = lonTo - lonFrom;

    var angle = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin(latDelta / 2), 2) +
      Math.cos(latFrom) * Math.cos(latTo) * Math.pow(Math.sin(lonDelta / 2), 2)));

    console.log(angle)
    return angle * 6371000;
  }

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
  }





}
