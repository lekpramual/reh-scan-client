import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import liff from '@line/liff';
import { LineService } from '../service/line.service';

type UnPromise<T> = T extends Promise<infer X> ? X : T;


@Component({
  selector: 'app-registerline',
  templateUrl: './registerline.component.html',
  styleUrls: ['./registerline.component.css']
})
export class RegisterlineComponent implements OnInit {

  os: ReturnType<typeof liff.getOS>;
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;

  pageUrl!: string | null;
  paramsUrl!: URLSearchParams | null;
  messageUrl!: string | null;

  constructor(
    private router: Router,
    private lineService: LineService,
  ) { }

  ngOnInit(): void {

    this.getParamUrl();
    // // is login line
    // if (this.lineService.getUserIsLogin()) {
    //   // get param line liff
    //   this.getParamUrl();
    // } else {
    //   // line liff
    //   this.getLiffLineWeb();
    // }
  }

  getLiffLineWeb() {
    // liff line
    liff.init({ liffId: '1656331237-XGkQjqOl' }).then(() => {
      this.os = liff.getOS();
      // is moblie
      if (liff.getOS() === "web") {
        if (liff.isLoggedIn()) {
          console.log('id loggein ... ')
          liff.getProfile().then(profile => {
            this.profile = profile;
            // บันทึกข้อมูล currentLine 
            console.log('login success...');
            localStorage.setItem('currentLine', JSON.stringify(this.profile));

            this.router.navigate(['/register']);
          }).catch(console.error);
        } else {
          console.log('is not login line ...')
          liff.login()
        }
      } else {
        console.log("GetOS : ", liff.getOS());
        this.router.navigate(['/notsupport']);
      }
    }).catch(console.error);
  }

  getLiffLineMobile() {
    // liff line
    liff.init({ liffId: '1656331237-XGkQjqOl' }).then(() => {
      this.os = liff.getOS();
      // is moblie
      if (liff.getOS() !== "web") {
        if (liff.isLoggedIn()) {
          console.log('id loggein ... ')
          liff.getProfile().then(profile => {
            this.profile = profile;
            // บันทึกข้อมูล currentLine 
            console.log('login success...');
            localStorage.setItem('currentLine', JSON.stringify(this.profile));

            // this.router.navigate(['/register']);
          }).catch(console.error);
        } else {
          console.log('is not login line ...')
          liff.login()
        }
      } else {
        console.log("GetOS : ", liff.getOS());
        this.router.navigate(['/notsupport']);
      }
    }).catch(console.error);
  }

  getParamUrl() {
    const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "");
    const params = new URLSearchParams(queryString);
    const page = params.get('page');

    this.pageUrl = page;
    this.paramsUrl = params;

    if (page != null && page != '') {
      this.messageUrl = "is param";
    } else {
      this.messageUrl = "is not param";
    }
  }

}
