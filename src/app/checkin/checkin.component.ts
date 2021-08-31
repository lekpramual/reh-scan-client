import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { PrimeNGConfig } from "primeng/api";

import liff from '@line/liff';

import packageInfo from '../../../package.json';
import { LineService } from '../service/line.service';
import { LocationService } from '../service/location.service'
import { ArepointService } from '../service/arepoint.service'

@Component({
  selector: 'app-checkin',
  templateUrl: './checkin.component.html',
  styleUrls: ['./checkin.component.css']
})
export class CheckinComponent implements OnInit {


  pictureUrl?: string = "../../assets/icon/logo128.png";
  userId?: string = "";
  displayName?: string = "";
  version!: string;

  lat = 0;
  lng = 0;

  statusParam!: string;
  locationParam!: number;

  constructor(
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private route: ActivatedRoute,
    private lineService: LineService,
    private locationService: LocationService,
    private arepointService: ArepointService
  ) {
    // redirect to home if already logged in
    if (!this.lineService.getUserIsLogin() && !this.lineService.getCurrentUserIsLogin()) {
      this.router.navigate(['/']);
    }
  }
  ngOnInit() {
    this.primengConfig.ripple = true;

    this.version = packageInfo.version;
    this.pictureUrl = this.lineService.getUserValue().pictureUrl;
    this.userId = this.lineService.getUserValue().userId;
    this.displayName = this.lineService.getUserValue().displayName;

    this.getLocaton();


    this.route.params.subscribe((params: Params) => {
      this.statusParam = params['status'];
      this.locationParam = params['location'];
    });
  }

  closeWindow() {
    liff.closeWindow();
  }

  getLocaton() {
    this.locationService.getPosition().then(pos => {
      this.lat = pos.lat;
      this.lng = pos.lng;
      console.log(`Positon: ${pos.lng} ${pos.lat}`);
    });
  }


  isCheckArePoint() {

    return this.arepointService.getDistanceFromLatLonInKm(
      { lat: 16.048707959999994, lng: 103.65104674999999 }, { lat: 16.04861893399044, lng: 103.65054529523633 }
    )
  }


}
