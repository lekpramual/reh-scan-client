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

  loginForm!: FormGroup;
  loading!: boolean;
  version!: string;

  pictureUrl?: string = "../../assets/icon/logo128.png";
  userId?: string = "";
  displayName?: string = "";


  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private lineService: LineService,
  ) {

  }

  ngOnInit(): void {

    this.getLineProfile();
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

  getLineProfile() {
    if (this.lineService.getUserIsLogin()) {
      this.pictureUrl = this.lineService.getUserValue().pictureUrl;
      this.userId = this.lineService.getUserValue().userId;
      this.displayName = this.lineService.getCurrentUserValue().name;
    }
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

      // redirect to profile
      this.router.navigate(['/profile']);

    }
  }


  filterCountry(event: { query: any; }) {

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
