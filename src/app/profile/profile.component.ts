import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import liff from '@line/liff';

import { UserService } from "../service/user.service";
import packageInfo from '../../../package.json';

import { LineService } from '../service/line.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  pictureUrl = "../../assets/icon/logo128.png";
  displayName = "";
  name = "";
  phone = "";
  version = "";
  badgenumber = "";

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
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
    this.getUserProfile();
  }


  getUserProfile() {
    this.userService.getUserProfile(this.lineService.getCurrentUserValue().badgenumber).then(resp => {

      console.log(resp)
      this.pictureUrl = this.lineService.getUserValue().pictureUrl;
      this.displayName = resp.name;

      this.name = resp.position;
      this.badgenumber = resp.beloag;
      this.phone = this.lineService.getCurrentUserValue().phone;

    });
  }

  closeWindow() {
    liff.closeWindow();
  }
}
