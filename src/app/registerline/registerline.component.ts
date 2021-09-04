import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LineService } from '../service/line.service';



@Component({
  selector: 'app-registerline',
  templateUrl: './registerline.component.html',
  styleUrls: ['./registerline.component.css']
})
export class RegisterlineComponent implements OnInit {

  pageUrl!: string | null;
  paramsUrl!: URLSearchParams | null;

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
        this.router.navigate(['/register'])
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

}
