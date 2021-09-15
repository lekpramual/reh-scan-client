import { Router, ActivatedRoute, Params } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { Component, OnInit } from '@angular/core';

// Service
import { LineService } from '../service/line.service';
import { ArepointService } from '../service/arepoint.service'
import { ScanlistService } from '../service/scanlist.service'
import { LocationService } from '../service/location.service'

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css'],
  providers: [MessageService]
})
export class CheckoutComponent implements OnInit {

  pictureUrl = "../../assets/icon/logo128.png";
  pictureScan = "assets/icon/013-fingerprint-8.png";
  displayName = "";
  badgenumber!: number;
  locationParam!: string;

  latitude!: number;
  longitude!: number;
  zoom!: number;
  point!: boolean;
  precise!: number;
  loadchk!: boolean;




  constructor(
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private route: ActivatedRoute,
    private lineService: LineService,
    private arepointService: ArepointService,
    private locationService: LocationService
  ) {



    // มีการเข้าสู่ระบบ line
    if (this.lineService.getUserIsLogin()) {
      // ไม่มีการ ลงทะเบียน
      if (!this.lineService.getCurrentUserIsLogin()) {
        this.router.navigate(['/register']);
      }
    }
  }
  ngOnInit(): void {

    this.primengConfig.ripple = true;

    this.pictureUrl = this.lineService.getUserValue().pictureUrl;
    this.displayName = this.lineService.getCurrentUserValue().name;
    this.badgenumber = this.lineService.getCurrentUserValue().badgenumber;
    this.setCurrentLocation()
      .then((position) => {
        console.log(position);
        this.latitude = position.latitude;
        this.longitude = position.longitude;
      }).catch((err) => {
        console.error(err.message);
      });

    //load Places Autocomplete

  }


  // Get Current Location Coordinates
  setCurrentLocation(): Promise<any> {
    // getCurrentPosition
    return new Promise((resolve, reject) => {
      // geolocation.getCurrentPosition ลงทะเบียนฟังก์ชันตัวจัดการที่จะเรียกโดยอัตโนมัติทุกครั้งที่ตำแหน่งของอุปกรณ์เปลี่ยนแปลง 
      // โดยจะส่งคืนตำแหน่งที่อัปเดต
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ longitude: resp.coords.longitude, latitude: resp.coords.latitude });
      },
        err => {
          reject(err);
        }, { maximumAge: 10000, enableHighAccuracy: false, timeout: 5000 });
    });
  }

  // Get Current Location Coordinates
  setCurrentLocationMark(): Promise<any> {
    // getCurrentPosition
    return new Promise((resolve, reject) => {
      // geolocation.watchPosition() | ดึงข้อมูลตำแหน่งปัจจุบันของอุปกรณ์
      // geolocation.getCurrentPosition ลงทะเบียนฟังก์ชันตัวจัดการที่จะเรียกโดยอัตโนมัติทุกครั้งที่ตำแหน่งของอุปกรณ์เปลี่ยนแปลง 
      // โดยจะส่งคืนตำแหน่งที่อัปเดต
      this.locationService.getLocationMark(80).then(resp => {
        console.log(resp)
        resolve({ longitude: parseFloat(resp.longitude), latitude: parseFloat(resp.latitude) });
      },
        err => {
          reject(err);
        });
    });
  }

  getAddressPromise(checktype: string) {
    this.loadchk = true;
    console.log('Address Promise ....')
    this.setCurrentLocation()
      .then((position) => {
        this.setCurrentLocationMark().then(mark => {
          console.log('Location Promise ....')
          const getPrecise = this.arepointService.testFun1(
            // ชุดแรกจุดเช็กอิน , จุดกึ่งกลาง สแกน
            { lat1: position.latitude, lon1: position.longitude }, { lat2: mark.latitude, lon2: mark.longitude }
          )
          const isPoint = this.arepointService.testFun(
            // ชุดแรกจุดเช็กอิน , จุดกึ่งกลาง สแกน
            { lat1: position.latitude, lon1: position.longitude }, { lat2: mark.latitude, lon2: mark.longitude }
          )

          this.point = isPoint;
          this.precise = getPrecise;


          setTimeout(() => {
            this.loadchk = false;
          }, 1000);
        }).catch((err) => {
          this.loadchk = false;
        });



      })
      .catch((err) => {

      });
  }

}
