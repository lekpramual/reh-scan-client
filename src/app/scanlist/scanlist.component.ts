import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import liff from '@line/liff';
import packageInfo from '../../../package.json';
import { LineService } from '../service/line.service';

import { ProductService } from '../service/productservice';
import { Product } from '../domain/product';

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


  products!: Product[];

  constructor(private router: Router,
    private lineService: LineService,
    private productService: ProductService
  ) {

  }

  ngOnInit(): void {
    this.version = packageInfo.version;

    this.pictureUrl = this.lineService.getUserValue().pictureUrl;
    this.userId = this.lineService.getUserValue().userId;
    this.displayName = this.lineService.getCurrentUserValue().name;

    this.productService.getProductsSmall().then(data => this.products = data);
  }

  closeWindow() {
    liff.closeWindow();
  }

}
