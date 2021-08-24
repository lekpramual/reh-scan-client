import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { FilterService } from "primeng/api";
import { SelectItemGroup } from "primeng/api";
import { UserService } from "../service/user.service";

import packageInfo from '../../../package.json';

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


  valFullName!: string;
  valPhone!: string;
  valCid!: string;

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
    this.version = packageInfo.version;

    this.userService.getUsers().then(countries => {
      this.countries = countries;
    });
  }

  get getControl() {
    return this.loginForm.controls;
  }

  public resetForm() {
    this.loading = true

    this.loginForm = this.formBuilder.group({
      // fullname: ['', [Validators.required]],
      fullname: { name: ['', [Validators.required]], code: ['', [Validators.required]] },
      phone: ['', [Validators.required, Validators.minLength(10)]],
      cid: ['', [Validators.required, Validators.minLength(13)]]
    })
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

  filterGroupedCity(event: { query: any; }) {
    let query = event.query;
    let filteredGroups = [];

    for (let optgroup of this.groupedCities) {
      let filteredSubOptions = this.filterService.filter(
        optgroup.items,
        ["label"],
        query,
        "contains"
      );
      if (filteredSubOptions && filteredSubOptions.length) {
        filteredGroups.push({
          label: optgroup.label,
          value: optgroup.value,
          items: filteredSubOptions
        });
      }
    }

    this.filteredGroups = filteredGroups;
  }

}
