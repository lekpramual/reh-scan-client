import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import liff from '@line/liff';
import packageInfo from '../../../package.json';
import { LineService } from '../service/line.service';

import { ProductService } from '../service/productservice';
import { Product } from '../domain/product';

import { ScanlistService } from "../service/scanlist.service";
import { timeout } from 'rxjs/operators';


@Component({
  selector: 'app-scanlist',
  templateUrl: './scanlist.component.html',
  styleUrls: ['./scanlist.component.css'],
  providers: [ScanlistService]
})
export class ScanlistComponent implements OnInit {

  pictureUrl?: string = "../../assets/icon/logo128.png";
  userId?: string = "";
  displayName?: string = "";
  version!: string;

  scanlists!: any[];
  scanlistload!: boolean;

  products!: Product[];

  constructor(private router: Router,
    private lineService: LineService,
    private productService: ProductService,
    private scanlistService: ScanlistService
  ) {

  }

  ngOnInit(): void {
    this.version = packageInfo.version;

    this.scanlistload = true;
    this.pictureUrl = this.lineService.getUserValue().pictureUrl;
    this.userId = this.lineService.getUserValue().userId;
    this.displayName = this.lineService.getCurrentUserValue().name;

    this.productService.getProductsSmall().then(data => this.products = data);

    // get data api
    this.getScanlist();

  }

  closeWindow() {
    liff.closeWindow();
  }

  getScanlist() {
    this.scanlistService.getScanLists(this.lineService.getCurrentUserValue().badgenumber)
      .then((resp: { data: any[]; }) => {
        setTimeout(() => {
          this.scanlistload = false;
          this.scanlists = resp.data;
        }, 3000)
      })
  }

}
