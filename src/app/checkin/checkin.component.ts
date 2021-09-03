import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
// Prime NG
import { PrimeNGConfig } from "primeng/api";
import { Message, MessageService } from 'primeng/api';

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
  styleUrls: ['./checkin.component.css'],
  providers: [MessageService]
})
export class CheckinComponent implements OnInit, OnDestroy {


  pictureUrl?: string = "../../assets/icon/logo128.png";
  userId?: string = "";
  displayName?: string = "";
  version!: string;

  lat = 0;
  lng = 0;

  lat2!: number;
  lng2!: number;

  statusParam!: string;
  locationParam!: number;
  loadLocation = false;
  currenLocation = false;


  myUserSub!: Subscription;

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
    this.getLocaton();
    // this.myUserSub = this.locationService.getLocation1().subscribe(rep => {
    //   this.lat = rep.coords.latitude;
    //   this.lng = rep.coords.longitude;
    //   console.log(rep)
    // })

    this.locationService.getPosition().then(rep => {
      this.lat2 = rep.lat;
      this.lng2 = rep.lng;
      console.log(rep)
    })
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


  }

  ngOnDestroy() {
    if (this.myUserSub) {
      this.myUserSub.unsubscribe();
    }
  }


  closeWindow() {
    liff.closeWindow();
  }

  showLocation(param: boolean) {
    console.log("Param : ", param);
    this.loadLocation = !param;
  }

  getLocaton() {
    this.myUserSub = this.locationService.getLocation1().subscribe(rep => {
      this.lat = rep.coords.latitude;
      this.lng = rep.coords.longitude;
      console.log(rep)
    })
  }

  isCheckArePoint() {
    // { lat2: 16.0579597, lon2: 103.6478599 } จุดกึ่งกลาง
    return this.arepointService.testFun(
      // ชุดแรกจุดเช็กอิน , จุดกึ่งกลาง สแกน
      { lat1: this.lat, lon1: this.lng }, { lat2: 16.048707958611494, lon2: 103.65104674217899 }
    )
  }

  isCheckArePoint1() {
    return this.arepointService.testFun1(
      // ชุดแรกจุดเช็กอิน , จุดกึ่งกลาง สแกน
      // { lat1: this.lat, lon1: this.lng }, { lat2: 16.04870796002785, lon2: 103.65104675015687 }
      { lat1: this.lat, lon1: this.lng }, { lat2: 16.048707958611494, lon2: 103.65104674217899 }
    )
  }
}

