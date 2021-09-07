import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

// Service
import { LineService } from '../service/line.service';
import { ArepointService } from '../service/arepoint.service'

@Component({
  selector: 'app-chk',
  templateUrl: './chk.component.html',
  styleUrls: ['./chk.component.css'],
  providers: [MessageService]
})
export class ChkComponent implements OnInit {

  pictureUrl = "../../assets/icon/logo128.png";
  displayName = "";

  latitude!: number;
  longitude!: number;
  zoom!: number;
  point!: boolean;
  precise!: number;

  constructor(
    private messageService: MessageService,
    private primengConfig: PrimeNGConfig,
    private router: Router,
    private route: ActivatedRoute,
    private lineService: LineService,
    private arepointService: ArepointService) {
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


    //this.showConfirm();
    //this.messageService.add({ key: 'c', sticky: true, severity: 'warn', summary: 'Are you sure?', detail: 'Confirm to proceed' });
    this.setCurrentLocation();
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
        }, { maximumAge: 0, enableHighAccuracy: true, timeout: 3000 });
    });
  }

  getAddressPromise() {
    console.log('Address Promise ....')
    this.setCurrentLocation()
      .then((position) => {
        console.log(position);
        this.latitude = position.latitude;
        this.longitude = position.longitude;

        const getPrecise = this.arepointService.testFun1(
          // ชุดแรกจุดเช็กอิน , จุดกึ่งกลาง สแกน
          { lat1: position.latitude, lon1: position.longitude }, { lat2: 16.04861489815688, lon2: 103.65051961805949 }
        )
        const isPoint = this.arepointService.testFun(
          // ชุดแรกจุดเช็กอิน , จุดกึ่งกลาง สแกน
          { lat1: position.latitude, lon1: position.longitude }, { lat2: 16.04861489815688, lon2: 103.65051961805949 }
        )

        // console.log(isPoint);
        // console.log(getPrecise);
        this.point = isPoint;
        this.precise = getPrecise;
        
        if (isPoint) {
          this.messageService.add({ key: 'tc', severity: 'success', summary: 'เรียบร้อย', detail: 'คุณได้ลงเวลาทำงาน' });
        } else {
          this.messageService.add({ key: 'tc', severity: 'warn', summary: 'แจ้งเตือน', detail: 'กรุณาตรวจสอบระยะห่างระหว่างจุดสแกน' });
        }
      })
      .catch((err) => {
        console.error(err.message);
        this.messageService.add({ key: 'tc', severity: 'error', summary: 'ผิดพลาด', detail: 'กรุณาตรวจสอบการเชื่อมต่อ' });
      });
  }

}
