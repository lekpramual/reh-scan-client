import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import liff from '@line/liff';
import { FilterService } from "primeng/api";
import { SelectItemGroup } from "primeng/api";

import { UserService } from "../service/user.service";
import packageInfo from '../../../package.json';

type UnPromise<T> = T extends Promise<infer X> ? X : T;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService, FilterService]
})
export class RegisterComponent implements OnInit {

  os: ReturnType<typeof liff.getOS>;
  profile!: UnPromise<ReturnType<typeof liff.getProfile>>;


  selectedCountry: any;

  countries!: any[];

  filteredCountries!: any[];

  selectedCountries!: any[];

  selectedCountryAdvanced!: any[];

  filteredBrands!: any[];

  groupedCities!: SelectItemGroup[];

  filteredGroups!: any[];


  pictureUrl?: string = "../../assets/icon/logo128.png";
  userId?: string = "";
  displayName?: string = "";

  loginForm!: FormGroup;
  loading!: boolean;
  version!: string;

  constructor(
    public formBuilder: FormBuilder,
    private userService: UserService,
    private filterService: FilterService
  ) { }

  ngOnInit(): void {

    this.resetForm();
    this.getUsers("");

    this.version = packageInfo.version;



    // liff line
    liff.init({ liffId: '1656331237-XGkQjqOl' }).then(() => {
      this.os = liff.getOS();
      if (liff.isLoggedIn()) {
        liff.getProfile().then(profile => {
          this.profile = profile;
          this.userId = profile.userId;
          this.pictureUrl = profile.pictureUrl;
          this.displayName = profile.displayName;

        }).catch(console.error);
      } else {
        liff.login()
      }
    }).catch(console.error);
  }

  get getControl() {
    return this.loginForm.controls;
  }

  resetForm() {
    this.loading = true

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

  onSubmit() {
    // delay progressSpinner 1 s 
    console.log(this.loginForm.valid)
    console.log(this.loginForm)
    if (this.loginForm.valid) {
      this.loading = false;
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

  // filterGroupedCity(event: { query: any; }) {
  //   let query = event.query;
  //   let filteredGroups = [];

  //   for (let optgroup of this.groupedCities) {
  //     let filteredSubOptions = this.filterService.filter(
  //       optgroup.items,
  //       ["label"],
  //       query,
  //       "contains"
  //     );
  //     if (filteredSubOptions && filteredSubOptions.length) {
  //       filteredGroups.push({
  //         label: optgroup.label,
  //         value: optgroup.value,
  //         items: filteredSubOptions
  //       });
  //     }
  //   }

  //   this.filteredGroups = filteredGroups;
  // }

}
