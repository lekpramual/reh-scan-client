import { Injectable } from '@angular/core';
import liff from '@line/liff';


type UnPromise<T> = T extends Promise<infer X> ? X : T;

@Injectable({
  providedIn: 'root'
})
export class LineService {

  os: ReturnType<typeof liff.getOS>;
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;

  constructor() {
    // this.getLiffLine();
  }
  // getLiffLine() {
  //   // liff line
  //   liff.init({ liffId: '1656331237-XGkQjqOl' }).then(() => {
  //     this.os = liff.getOS();
  //     if (liff.isLoggedIn()) {
  //       liff.getProfile().then(profile => {
  //         this.profile = profile;
  //         console.log(this.profile)
  //         // บันทึกข้อมูล currentLine 
  //         localStorage.setItem('currentLine', JSON.stringify({
  //           userId: this.profile.userId,
  //           displayName: this.profile.displayName,
  //           pictureUrl: this.profile.pictureUrl,
  //         }));
  //       }).catch(console.error);
  //     } else {
  //       console.log('login ...')
  //       // liff.login()
  //     }
  //   }).catch(console.error);
  // }

  getUserValue() {
    return JSON.parse(localStorage.getItem("currentLine")!);
  }
}
