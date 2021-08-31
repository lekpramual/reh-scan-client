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
    console.log(Math.sqrt(dx * dx + dy * dy) <= 0.1);
    return Math.sqrt(dx * dx + dy * dy) <= 0.1;
  }


  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //:::                                                                         :::
  //:::  This routine calculates the distance between two points (given the     :::
  //:::  latitude/longitude of those points). It is being used to calculate     :::
  //:::  the distance between two locations using GeoDataSource (TM) prodducts  :::
  //:::                                                                         :::
  //:::  Definitions:                                                           :::
  //:::    South latitudes are negative, east longitudes are positive           :::
  //:::                                                                         :::
  //:::  Passed to function:                                                    :::
  //:::    lat1, lon1 = Latitude and Longitude of point 1 (in decimal degrees)  :::
  //:::    lat2, lon2 = Latitude and Longitude of point 2 (in decimal degrees)  :::
  //:::    unit = the unit you desire for results                               :::
  //:::           where: 'M' is statute miles (default)                         :::
  //:::                  'K' is kilometers                                      :::
  //:::                  'N' is nautical miles                                  :::
  //:::                                                                         :::
  //:::  Worldwide cities and other features databases with latitude longitude  :::
  //:::  are available at https://www.geodatasource.com                         :::
  //:::                                                                         :::
  //:::  For enquiries, please contact sales@geodatasource.com                  :::
  //:::                                                                         :::
  //:::  Official Web site: https://www.geodatasource.com                       :::
  //:::                                                                         :::
  //:::               GeoDataSource.com (C) All Rights Reserved 2018            :::
  //:::                                                                         :::
  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  distance(checkPoint: { lat: number; lng: number; }, centerPoint: { lat: number; lng: number; }) {

    //lat1, lon1, lat2, lon2, unit

    if ((checkPoint.lat == centerPoint.lat) && (centerPoint.lng == centerPoint.lng)) {
      return 0;
    }
    else {
      var radlat1 = Math.PI * checkPoint.lat / 180;
      var radlat2 = Math.PI * centerPoint.lat / 180;
      var theta = centerPoint.lng - centerPoint.lng;
      var radtheta = Math.PI * theta / 180;
      var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);

      console.log(dist);
      if (dist > 1) {
        dist = 1;
      }
      dist = Math.acos(dist);
      dist = dist * 180 / Math.PI;
      dist = dist * 60 * 1.1515;
      // if (unit == "K") { dist = dist * 1.609344 }
      // if (unit == "N") { dist = dist * 0.8684 }
      // dist = dist * 1.609344

      dist = dist * 1.609344
      console.log(dist)
      console.log(Math.sin(0.0006))
      return Math.sqrt(dist) <= 0.0006;
    }
  }

  getDistanceFromLatLonInKm(checkPoint: { lat: number; lng: number; }, centerPoint: { lat: number; lng: number; }) {
    // lat1,lon1,lat2,lon2
    var R = 6371; // Radius of the earth in km
    var dLat = this.deg2rad(checkPoint.lat - centerPoint.lat);  // deg2rad below
    var dLon = this.deg2rad(checkPoint.lng - centerPoint.lng);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(centerPoint.lat)) * Math.cos(this.deg2rad(checkPoint.lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
      ;
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d;
  }

  deg2rad(deg: number) {
    return deg * (Math.PI / 180)
  }
}
