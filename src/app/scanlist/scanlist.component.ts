import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import liff from '@line/liff';
import packageInfo from '../../../package.json';
import { LineService } from '../service/line.service';


@Component({
  selector: 'app-scanlist',
  templateUrl: './scanlist.component.html',
  styleUrls: ['./scanlist.component.css']
})
export class ScanlistComponent implements OnInit {

  pictureUrl?: string = "../../assets/icon/logo128.png";
  userId?: string = "";
  displayName?: string = "";
  version!: string;

  constructor(private router: Router,
    private lineService: LineService) {
    if (!this.lineService.getUserIsLogin() && !this.lineService.getCurrentUserIsLogin()) {
      this.router.navigate(['/']);
    }

  }

  ngOnInit(): void {
    this.version = packageInfo.version;
    this.pictureUrl = this.lineService.getUserValue().pictureUrl;
    this.userId = this.lineService.getUserValue().userId;
    this.displayName = this.lineService.getCurrentUserValue().name;
  }

  closeWindow() {
    liff.closeWindow();
  }

}
