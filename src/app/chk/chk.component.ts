import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

// Service
import { LineService } from '../service/line.service';
import { ArepointService } from '../service/arepoint.service'
import { ScanlistService } from '../service/scanlist.service'
import { LocationService } from '../service/location.service'

@Component({
  selector: 'app-chk',
  templateUrl: './chk.component.html',
  styleUrls: ['./chk.component.css'],
  providers: [MessageService]
})
export class ChkComponent implements OnInit {


  pictureUrl = "assets/icon/logo128.png";
  pictureScan = "assets/icon/013-fingerprint-8.png";
  displayName = "";
  badgenumber!: number;
  locationParam!: string;

  latitude!: number;
  longitude!: number;
  latitudeMark!: number;
  longitudeMark!: number;
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
    private scanlistService: ScanlistService,
    private arepointService: ArepointService,
    private locationService: LocationService) {
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
    // this.pictureUrl = "assets/icon/logo128.png";
    // this.displayName = "เล็ก ลำปาว";
    // this.badgenumber = 1735;

    this.route.params.subscribe((params: Params) => {
      this.locationParam = params['location'];
    });

    // this.setCurrentLocation()
    //   .then((position) => {
    //     this.latitude = position.latitude;
    //     this.longitude = position.longitude;
    //   }).catch((err) => {
    //     console.error(err.message);
    //   });
  }

  // Get Current Location Coordinates
  setCurrentLocation(): Promise<any> {
    // getCurrentPosition
    return new Promise((resolve, reject) => {
      // geolocation.watchPosition() | ดึงข้อมูลตำแหน่งปัจจุบันของอุปกรณ์
      // geolocation.getCurrentPosition ลงทะเบียนฟังก์ชันตัวจัดการที่จะเรียกโดยอัตโนมัติทุกครั้งที่ตำแหน่งของอุปกรณ์เปลี่ยนแปลง 
      // โดยจะส่งคืนตำแหน่งที่อัปเดต
      navigator.geolocation.getCurrentPosition(resp => {
        resolve({ longitude: resp.coords.longitude, latitude: resp.coords.latitude });
      },
        err => {
          reject(err);
        }, { maximumAge: 0, enableHighAccuracy: true, timeout: 1000 });
    });
  }

  // getAddressPromise(checktype: string) {
  //   this.loadchk = true;
  //   console.log('Address Promise ....')
  //   this.setCurrentLocation()
  //     .then((position) => {
  //       this.setCurrentLocationMark().then(mark => {
  //         console.log('Location Promise ....')
  //         const getPrecise = this.arepointService.testFun1(
  //           // ชุดแรกจุดเช็กอิน , จุดกึ่งกลาง สแกน
  //           { lat1: position.latitude, lon1: position.longitude }, { lat2: mark.latitude, lon2: mark.longitude }
  //         )
  //         const isPoint = this.arepointService.testFun(
  //           // ชุดแรกจุดเช็กอิน , จุดกึ่งกลาง สแกน
  //           { lat1: position.latitude, lon1: position.longitude }, { lat2: mark.latitude, lon2: mark.longitude }
  //         )

  //         this.point = isPoint;
  //         this.precise = getPrecise;

  //         if (isPoint) {
  //           this.scanlistService.createPost({
  //             "userId": this.badgenumber,
  //             "checkType": checktype,
  //             "scanId": this.locationParam
  //           }).then(resp => {
  //             if (resp === "created successful") {
  //               setTimeout(() => {
  //                 this.loadchk = false;
  //                 this.messageService.add({ key: 'bc', severity: 'success', summary: 'เรียบร้อย', detail: 'คุณได้ลงเวลาทำงาน' });
  //               }, 1000);
  //             } else {
  //               setTimeout(() => {
  //                 this.loadchk = false;
  //                 this.messageService.add({ key: 'bc', severity: 'warn', summary: 'แจ้งเตือน', detail: 'กรุณาตรวจสอบการเชื่อมต่อ' });
  //               }, 1000);
  //             }
  //           })
  //         } else {
  //           setTimeout(() => {
  //             this.loadchk = false;
  //             this.messageService.add({ key: 'bc', severity: 'warn', summary: 'แจ้งเตือน', detail: 'กรุณาตรวจสอบระยะห่างระหว่างจุดสแกน' });
  //           }, 1000);
  //         }
  //       }).catch((err) => {
  //         setTimeout(() => {
  //           this.loadchk = false;
  //           console.error(err.message);
  //           this.messageService.add({ key: 'bc', severity: 'error', summary: 'ผิดพลาด', detail: 'กรุณาตรวจสอบการเชื่อมต่อ ข้อมูล' });
  //         }, 1000);
  //       });
  //     })
  //     .catch((err) => {
  //       setTimeout(() => {
  //         this.loadchk = false;
  //         console.error(err.message);
  //         this.messageService.add({ key: 'bc', severity: 'error', summary: 'ผิดพลาด', detail: 'กรุณาตรวจสอบการเชื่อมต่อ' });
  //       }, 1000);
  //     });
  // }

  getAddressPromise(checktype: string) {
    this.loadchk = true;
    console.log('Address Promise ....')
    this.setCurrentLocation()
      .then((position) => {
        this.latitude = position.latitude;
        this.longitude = position.longitude;


        this.locationService.getLocationMark(this.locationParam).then(resp => {
          const resp_lat = resp.latitude;
          const resp_lng = resp.longitude;
          const getPrecise = this.arepointService.testFun1(
            // ชุดแรกจุดเช็กอิน , จุดกึ่งกลาง สแกน
            { lat1: position.latitude, lon1: position.longitude }, { lat2: resp_lat, lon2: resp_lng }
          )
          const isPoint = this.arepointService.testFun(
            // ชุดแรกจุดเช็กอิน , จุดกึ่งกลาง สแกน
            { lat1: position.latitude, lon1: position.longitude }, { lat2: resp_lat, lon2: resp_lng }
          )

          this.point = isPoint;
          this.precise = getPrecise;

          // success scan 
          if (isPoint) {
            this.scanlistService.createPost({
              "userId": this.badgenumber,
              "checkType": checktype,
              "scanId": this.locationParam
            }).then(resp => {
              if (resp === "created successful") {
                setTimeout(() => {
                  this.loadchk = false;
                  this.messageService.add({ key: 'bc', severity: 'success', summary: 'เรียบร้อย', detail: 'คุณได้ลงเวลาทำงาน' });
                }, 1000);
              } else {
                setTimeout(() => {
                  this.loadchk = false;
                  this.messageService.add({ key: 'bc', severity: 'warn', summary: 'แจ้งเตือน', detail: 'กรุณาตรวจสอบการเชื่อมต่อ' });
                }, 1000);
              }
            }).catch(err => {
              setTimeout(() => {
                this.loadchk = false;
                console.error(err.message);
                this.messageService.add({ key: 'bc', severity: 'error', summary: 'ผิดพลาด', detail: err });
              }, 1000);
            })
          } else {
            // failed scan
            setTimeout(() => {
              this.loadchk = false;
              this.messageService.add({ key: 'bc', severity: 'warn', summary: 'แจ้งเตือน', detail: 'กรุณาตรวจสอบระยะห่างระหว่างจุดสแกน' });
            }, 1000);
          }
        }).catch(err => {
          // error is not api 
          setTimeout(() => {
            this.loadchk = false;
            console.error(err.message);
            this.messageService.add({ key: 'bc', severity: 'error', summary: 'ผิดพลาด', detail: 'ดึงข้อมูลผิดพลาด' });
          }, 1000);
        })
      })
      .catch((err) => {
        // error is not location 
        setTimeout(() => {
          this.loadchk = false;
          console.error(err.message);
          this.messageService.add({ key: 'bc', severity: 'error', summary: 'ผิดพลาด', detail: 'การเชื่อมต่อ GPS ผิดพลาด' });
        }, 1000);
      });
  }

}
