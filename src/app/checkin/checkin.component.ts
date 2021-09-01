import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { Subscription, timer } from 'rxjs';
import { switchMap } from 'rxjs/operators';
// Prime NG
import { PrimeNGConfig } from "primeng/api";

// Line Liff
import liff from '@line/liff';

// Component
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

  subscription!: Subscription;

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

    // load location
    // this.getLocaton();
  }
  ngOnInit() {
    this.primengConfig.ripple = true;

    this.version = packageInfo.version;
    this.pictureUrl = this.lineService.getUserValue().pictureUrl;
    this.userId = this.lineService.getUserValue().userId;
    this.displayName = this.lineService.getUserValue().displayName;


    this.route.params.subscribe((params: Params) => {
      this.statusParam = params['status'];
      this.locationParam = params['location'];
    });

    // load location
    // this.getLocaton();

    // 10000
    this.subscription = timer(0, 10000).pipe(
      switchMap(() => this.locationService.getPosition())
    ).subscribe(pos => {
      console.log('reload ...')
      this.lat = pos.lat;
      this.lng = pos.lng;
    });

  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
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
    // { lat2: 16.0487079, lon2: 103.6510467 } จุดกึ่งกลาง
    // { lat1: 16.0486144, lon1: 103.6505200 } จุดสแกน นอกศูนย์คอม | 3.2183401536933527
    // { lat1: 16.048707960017705, lon1: 103.65104675009971 }, ห้องประชุม ชั้น 7 |  54.492843409208106
    return this.arepointService.testFun(
      // ชุดแรกจุดเช็กอิน , จุดกึ่งกลาง สแกน
      { lat1: this.lat, lon1: this.lng }, { lat2: 16.04870796002785, lon2: 103.65104675015687 }
    )
  }

  isCheckArePoint1() {
    return this.arepointService.testFun1(
      // ชุดแรกจุดเช็กอิน , จุดกึ่งกลาง สแกน
      // { lat1: this.lat, lon1: this.lng }, { lat2: 16.04870796002785, lon2: 103.65104675015687 }
      { lat1: this.lat, lon1: this.lng }, { lat2: 16.04870796002785, lon2: 103.65104675015687 }
    )
  }


}
