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

    if (page != null && page != '') {
      if (page === "register") {
        // this.router.navigate(['/register'])
        this.getLiffLineMobile();
      } else if (page === "scanlist") {
        this.router.navigate(['/scanlist'])
      } else if (page === "checkin") {
        const status = params.get('status');
        const location = params.get('location');
        // refresh page without reloading
        this.router.navigate(['/checkin', status, location])
      } else {
        this.router.navigate(['/notsupport'])
      }
    }


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

}
