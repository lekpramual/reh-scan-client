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
  }

}
