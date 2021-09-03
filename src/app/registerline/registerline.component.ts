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


  constructor(
    private router: Router,
    private lineService: LineService,
  ) {

    // get param line liff
    // const queryString = decodeURIComponent(window.location.search).replace("?liff.state=", "");
    const queryString = decodeURIComponent(window.location.search);
    const params = new URLSearchParams(queryString);
    const page = params.get('page');

    console.log(queryString);

    if (page != null && page != '') {
      // is login line and register
      if (this.lineService.getUserIsLogin() && this.lineService.getCurrentUserIsLogin()) {
        if (page === "checkin") {
          const status = params.get('status');
          const location = params.get('location');
          // refresh page without reloading
          //this.router.navigate(['/checkin', status, location]);
          this.router.navigate(['/checkin', status, location]).then(() => {
            window.location.reload();
          });
        } else if (page === "scanlist") {
          this.router.navigate(['/scanlist']);
        }
      } else {
        this.router.navigate(['/register']);
      }
    }
    // is not param page
    else {
      // is login line
      if (this.lineService.getUserIsLogin()) {
        // is register
        if (this.lineService.getCurrentUserIsLogin()) {
          this.router.navigate(['/profile']);
        }
        // is not register
        else {
          this.router.navigate(['/register']);
        }
      }
    }
  }

  ngOnInit(): void {
    this.getLiffLine();
  }

  getLiffLine() {
    // liff line
    liff.init({ liffId: '1656331237-XGkQjqOl' }).then(() => {
      this.os = liff.getOS();

      // if (liff.isLoggedIn()) {
      //   console.log('id loggein ... ')
      //   liff.getProfile().then(profile => {
      //     this.profile = profile;
      //     // บันทึกข้อมูล currentLine 
      //     console.log('login success...');
      //     localStorage.setItem('currentLine', JSON.stringify(this.profile));

      //     this.router.navigate(['/register']);
      //   }).catch(console.error);
      // } else {
      //   console.log('is not login line ...')
      //   liff.login()
      // }

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
