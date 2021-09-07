import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LineService } from '../service/line.service';

import liff from '@line/liff';

type UnPromise<T> = T extends Promise<infer X> ? X : T;

@Component({
  selector: 'app-registerline',
  templateUrl: './registerline.component.html',
  styleUrls: ['./registerline.component.css']
})
export class RegisterlineComponent implements OnInit {

  pageUrl!: string | null;
  paramsUrl!: URLSearchParams | null;

  os: ReturnType<typeof liff.getOS>;
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;

  constructor(
    private router: Router,
    private lineService: LineService,
  ) { }

  ngOnInit(): void {
    // get param line liff
    const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "");
    const params = new URLSearchParams(queryString);
    const page = params.get('page');

    this.paramsUrl = params;
    this.pageUrl = page;

    // check login line 
    this.getLiffLineWeb();
  }

  getLiffLineWeb() {
    // liff line
    liff.init({ liffId: '1656331237-XGkQjqOl' }).then(() => {
      this.os = liff.getOS();
      // is check in moblie
      if (liff.getOS() !== "web") {
        // is moblie
        if (liff.isLoggedIn()) {
          console.log('id loggein ... ')
          liff.getProfile().then(profile => {
            this.profile = profile;
            // บันทึกข้อมูล currentLine 
            console.log('login success...');
            localStorage.setItem('currentLine', JSON.stringify(this.profile));

            console.log('Page URL : ', this.pageUrl);
            // is check param
            if (this.pageUrl != null && this.pageUrl != '') {
              if (this.pageUrl === "register") {
                // is register
                if (this.lineService.getCurrentUserIsLogin()) {
                  this.router.navigate(['/profile'])
                } else {
                  // is not register
                  this.router.navigate(['/register']);
                }
              } else if (this.pageUrl === "scanlist") {
                // is register
                if (this.lineService.getCurrentUserIsLogin()) {
                  this.router.navigate(['/scanlist'])
                } else {
                  // is not register
                  this.router.navigate(['/register']);
                }
              } else if (this.pageUrl === "checkin") {
                const status = this.paramsUrl?.get('status');
                const location = this.paramsUrl?.get('location');
                // is register
                if (this.lineService.getCurrentUserIsLogin()) {
                  // refresh page without reloading
                  this.router.navigate(['/checkin', status, location])
                } else {
                  // is not register
                  this.router.navigate(['/register']);
                }
              }else if (this.pageUrl === "checkout") {
                const location = this.paramsUrl?.get('location');
                // is register
                if (this.lineService.getCurrentUserIsLogin()) {
                  // refresh page without reloading
                  this.router.navigate(['/checkout', location])
                } else {
                  // is not register
                  this.router.navigate(['/register']);
                }
              } else {
                this.router.navigate(['/notsupport'])
              }
            }
          }).catch(console.error);
        } else {
          console.log('is not login line ...')
          liff.login()
        }
      } else {
        this.router.navigate(['/notsupport'])
      }

    }).catch(console.error);
  }

}
