import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PrimeNGConfig } from "primeng/api";

import liff from '@line/liff';

import packageInfo from '../../../package.json';
import { LineService } from '../service/line.service';

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

  constructor(private primengConfig: PrimeNGConfig, private router: Router,
    private lineService: LineService) {
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
  }

  closeWindow() {
    liff.closeWindow();
  }


}
