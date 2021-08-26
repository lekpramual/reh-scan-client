import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import liff from '@line/liff';
import { FilterService } from "primeng/api";
import { SelectItemGroup } from "primeng/api";

import { UserService } from "../service/user.service";
import packageInfo from '../../../package.json';

import { AuthenticationService } from '../service/authentication.service';

type UnPromise<T> = T extends Promise<infer X> ? X : T;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  providers: [UserService, FilterService]
})
export class RegisterComponent implements OnInit {
  [x: string]: any;

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
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
  ) {

    this.getLiffLine();

    // redirect to home if already logged in
    // if (this.authenticationService.currentUserValue) {
    //   this.router.navigate(['/']);
    // }
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

  getLiffLine() {
    // liff line
    liff.init({ liffId: '1656331237-XGkQjqOl' }).then(() => {
      this.os = liff.getOS();
      if (liff.isLoggedIn()) {
        console.log('id loggein ... ')
        liff.getProfile().then(profile => {
          this.profile = profile;
          console.log(this.profile)
          // บันทึกข้อมูล currentLine 
          console.log('login success...')
          localStorage.setItem('currentLine', JSON.stringify({
            userId: this.profile.userId,
            displayName: this.profile.displayName,
            pictureUrl: this.profile.pictureUrl,
          }));

        }).catch(console.error);
      } else {
        liff.login()
      }
    }).catch(console.error);
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
      }));

      // ตรวจสอบว่ามี currentUser เข้าสู่ระบบแล้ว 
      if (this.authenticationService.currentUserValue) {
        this.router.navigate(['/checkin']);
      }
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
