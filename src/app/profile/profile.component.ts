import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import liff from '@line/liff';

import { UserService } from "../service/user.service";
import packageInfo from '../../../package.json';
import { MessageService } from 'primeng/api';
import { PrimeNGConfig } from 'primeng/api';

import { LineService } from '../service/line.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [MessageService]
})
export class ProfileComponent implements OnInit {

  pictureUrl = "../../assets/icon/logo128.png";
  displayName = "";
  name = "";
  phone = "";
  version = "";
  badgenumber = "";

  loadchk: boolean = true;

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private primengConfig: PrimeNGConfig,
    private lineService: LineService) {

    // มีการเข้าสู่ระบบ line
    if (this.lineService.getUserIsLogin()) {
      // ไม่มีการ ลงทะเบียน
      if (!this.lineService.getCurrentUserIsLogin()) {
        this.router.navigate(['/register']);
      }
    }
  }

  ngOnInit(): void {

    this.version = packageInfo.version;

    this.getUserProfile()
      .then((data) => {
        this.loadchk = false;
        this.displayName = data.displayName;
        this.name = data.name;
        this.badgenumber = data.badgenumber;
        this.pictureUrl = this.lineService.getUserValue().pictureUrl;
        this.phone = this.lineService.getCurrentUserValue().phone;
      }).catch((err) => {
        console.error(err.message);
      });
  }

  // Get Current Location Coordinates
  getUserProfile(): Promise<any> {
    // getCurrentPosition
    return new Promise((resolve, reject) => {
      // geolocation.watchPosition() | ดึงข้อมูลตำแหน่งปัจจุบันของอุปกรณ์
      // geolocation.getCurrentPosition ลงทะเบียนฟังก์ชันตัวจัดการที่จะเรียกโดยอัตโนมัติทุกครั้งที่ตำแหน่งของอุปกรณ์เปลี่ยนแปลง 
      // โดยจะส่งคืนตำแหน่งที่อัปเดต
      this.userService.getUserProfile(this.lineService.getCurrentUserValue().badgenumber).then(resp => {
        console.log(resp)
        resolve({ displayName: resp.name, name: resp.position, badgenumber: resp.beloag });
      },
        err => {
          reject(err);
        });
    });
  }

  closeWindow() {
    liff.closeWindow();
  }
}
