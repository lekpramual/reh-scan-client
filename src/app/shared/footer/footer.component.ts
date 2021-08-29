import { Component, OnInit } from '@angular/core';


// Line Liff
import liff from '@line/liff';

// Version App
import packageInfo from '../../../../package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  version = "0.0.0";
  
  constructor() { }

  ngOnInit(): void {
    this.version = packageInfo.version;
  }

  closeWindow() {
    liff.closeWindow();
  }
}
