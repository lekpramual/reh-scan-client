import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { FilterService } from "primeng/api";
import { SelectItemGroup } from "primeng/api";

import { UserService } from "../service/user.service";
import packageInfo from '../../../package.json';

import { LineService } from '../service/line.service';

import liff from '@line/liff';

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

  }

  ngOnInit(): void {

    this.getLiffLineMobile();
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

  getLiffLineMobile() {
    // liff line
    liff.init({ liffId: '1656331237-XGkQjqOl' }).then(() => {
      this.os = liff.getOS();
      // is moblie
      if (liff.getOS() !== "web") {
        if (liff.isLoggedIn()) {
          console.log('id loggein ... ')
          liff.getProfile().then(profile => {
            this.profile = profile;
            // บันทึกข้อมูล currentLine 
            console.log('login success...');
            localStorage.setItem('currentLine', JSON.stringify(this.profile));
            this.router.navigate(['/register']);
          }).catch(console.error);
        } else {
          console.log('is not login line ...')
          liff.login()
        }
      } else {
        console.log("GetOS : ", liff.getOS());
        this.router.navigate(['/notsupport']);
      }
    }).catch(console.error);
  }
}
