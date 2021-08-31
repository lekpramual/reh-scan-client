import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";


import { FilterService } from "primeng/api";
import { SelectItemGroup } from "primeng/api";

import { UserService } from "../service/user.service";
import packageInfo from '../../../package.json';

import { LineService } from '../service/line.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService, FilterService]
})
export class RegisterComponent implements OnInit {

  selectedCountry: any;

  countries!: any[];

  filteredCountries!: any[];

  selectedCountries!: any[];

  selectedCountryAdvanced!: any[];

  filteredBrands!: any[];

  groupedCities!: SelectItemGroup[];

  filteredGroups!: any[];

  pictureUrl?: string = "../../assets/icon/logo128.png";
  userId?: string = "{{userId}}";
  displayName?: string = "{{displayName}}";

  loginForm!: FormGroup;
  loading!: boolean;
  version!: string;

  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private lineService: LineService,
  ) {
    // is register line
    if (this.lineService.getUserIsLogin()) {
      // get data is local store
      this.pictureUrl = this.lineService.getUserValue().pictureUrl;
      this.userId = this.lineService.getUserValue().userId;
      this.displayName = this.lineService.getUserValue().displayName;
      // is register 
      if (this.lineService.getCurrentUserIsLogin()) {
        this.router.navigate(['/profile']);
      }
    }

  }

  ngOnInit(): void {

    this.resetForm();
    this.getUsers("");
    this.version = packageInfo.version;

  }

  get getControl() {
    return this.loginForm.controls;
  }

  resetForm() {
    this.loading = true;
    this.loginForm = this.formBuilder.group({
      fullname: ['', [Validators.required]],
      phone: ['', [Validators.required, Validators.minLength(10)]]
    })
  }

  getUsers(name: any) {
    this.userService.getUsers(name).then(countries => {
      this.countries = countries.data;
    });
  }

  public SimulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 1000));
  };

  onSubmit() {
    // delay progressSpinner 1 s 
    if (this.loginForm.valid) {

      this.loading = false;

      // บันทึกข้อมูล currentUser 
      localStorage.setItem('currentUser', JSON.stringify({
        badgenumber: this.loginForm.value.fullname.badgenumber,
        name: this.loginForm.value.fullname.name,
        phone: this.loginForm.value.phone
      }));

      // ตรวจสอบว่ามี currentUser เข้าสู่ระบบแล้ว 
      this.router.navigate(['/profile']);

    }
  }


  filterCountry(event: { query: any; }) {
    console.log(event);

    this.getUsers(event.query)

    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    for (let i = 0; i < this.countries.length; i++) {
      let country = this.countries[i];
      if (country.name.toLowerCase().indexOf(query.toLowerCase()) == 0) {
        filtered.push(country);
      }
    }

    this.filteredCountries = filtered;
  }
}
