import { Router, ActivatedRoute, Params } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader } from '@agm/core';

// Service
import { LineService } from '../service/line.service';
import { ArepointService } from '../service/arepoint.service'
import { ScanlistService } from '../service/scanlist.service'


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

  title: string = 'AGM project';
  latitudeNew!: number;
  longitudeNew!: number;

  @ViewChild('search')
  public searchElementRef!: ElementRef;

  constructor(
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private route: ActivatedRoute,
    private lineService: LineService,
    private scanlistService: ScanlistService,
    private arepointService: ArepointService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
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
    this.mapsAPILoader.load().then((resp) => {
      console.log(resp)
    });

  }

  onMapClicked(event: any) {
    console.table(event.coords);
    this.latitude = event.coords.lat;
    this.longitude = event.coords.lng;
  }

  // Get Current Location Coordinates
  setCurrentLocation(): Promise<any> {
    // getCurrentPosition
    return new Promise((resolve, reject) => {
      // geolocation.watchPosition() | ดึงข้อมูลตำแหน่งปัจจุบันของอุปกรณ์
      // geolocation.getCurrentPosition ลงทะเบียนฟังก์ชันตัวจัดการที่จะเรียกโดยอัตโนมัติทุกครั้งที่ตำแหน่งของอุปกรณ์เปลี่ยนแปลง 
      // โดยจะส่งคืนตำแหน่งที่อัปเดต
      navigator.geolocation.getCurrentPosition(resp => {
        console.log(resp);
        resolve({ longitude: resp.coords.longitude, latitude: resp.coords.latitude });
      },
        err => {
          reject(err);
        }, { maximumAge: 10000, enableHighAccuracy: false, timeout: 5000 });
    });
  }

  getAddressPromise() {
    this.loadchk = true;
    console.log('Address Promise ....')
    this.setCurrentLocation()
      .then((position) => {
        console.log(position);
        this.latitude = position.latitude;
        this.longitude = position.longitude;

        const getPrecise = this.arepointService.testFun1(
          // ชุดแรกจุดเช็กอิน , จุดกึ่งกลาง สแกน
          // 16.047754894773323, 103.65174275144074
          // { lat1: position.latitude, lon1: position.longitude }, { lat2: 16.047752011951047, lon2: 103.65156527187919 }
          { lat1: position.latitude, lon1: position.longitude }, { lat2: 16.047754894773323, lon2: 103.65174275144074 }
        )

        const isPoint = this.arepointService.testFun2(
          // ชุดแรกจุดเช็กอิน , จุดกึ่งกลาง สแกน
          { lat1: position.latitude, lon1: position.longitude })

        this.point = isPoint;
        this.precise = getPrecise;

        console.log(isPoint)

        this.loadchk = false;
      })
      .catch((err) => {
        setTimeout(() => {
          this.loadchk = false;
          console.error(err.message);
          this.messageService.add({ key: 'bc', severity: 'error', summary: 'ผิดพลาด', detail: 'กรุณาตรวจสอบการเชื่อมต่อ' });
        }, 3000);
      });
  }

}
