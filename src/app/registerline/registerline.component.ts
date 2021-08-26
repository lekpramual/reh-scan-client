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

    // redirect to home if already logged in
    if (this.lineService.getUserIsLogin()) {
      this.router.navigate(['/register']);
    }
  }

  ngOnInit(): void {
    this.getLiffLine();
  }

  getLiffLine() {
    // liff line
    liff.init({ liffId: '1656331237-XGkQjqOl' }).then(() => {
      this.os = liff.getOS();
      if (liff.isLoggedIn()) {
        console.log('id loggein ... ')
        liff.getProfile().then(profile => {
          this.profile = profile;
          console.log(this.profile)
          // บันทึกข้อมูล currentLine 
          console.log('login success...');
          localStorage.setItem('currentLine', JSON.stringify(this.profile));
        }).catch(console.error);
      } else {
        console.log('is not login line ...')
        liff.login()
      }
    }).catch(console.error);
  }

}
