import { Injectable } from '@angular/core';
import {
    Router, CanActivate,
    ActivatedRouteSnapshot,
    RouterStateSnapshot,
    ActivatedRoute
} from '@angular/router';

import { AuthenticationService } from '../service/authentication.service';
import { LineService } from '../service/line.service';

@Injectable({ providedIn: 'root' })

export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
        private lineService: LineService
    ) { }

    // route: ActivatedRouteSnapshot, state: RouterStateSnapshot
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        console.log("Guard Active");
        const currentUser = this.authenticationService.currentUserValue;
        const currentLine = this.lineService.getUserValue();

        console.log(currentLine);

        if (currentLine) {
            // console.log("Guard : ", currentUser)
            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        // this.router.navigate(['/auth']);


        this.router.navigate(['/registerline']);
        return false;

    }
}