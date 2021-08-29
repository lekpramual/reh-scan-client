import { Component, OnInit } from '@angular/core';

// Prime NG
import { Message, MessageService } from 'primeng/api';

@Component({
  selector: 'app-notsupport',
  templateUrl: './notsupport.component.html',
  styleUrls: ['./notsupport.component.css'],
  providers: [MessageService]
})
export class NotsupportComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
