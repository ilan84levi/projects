import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { Store } from '../redux/store';


@Injectable({
    providedIn: 'root'
})
export class CustomersGuardService implements CanActivate {

    constructor(private redux: NgRedux<Store>, private router: Router) { }

    canActivate(activatedRouteSnapshot: ActivatedRouteSnapshot,
        routerStateSnapshot: RouterStateSnapshot): boolean {

        if (this.redux.getState().customerLoggedIn) {
            console.log()
            return true;
        }

        this.router.navigate(["/home/register"], { queryParams: { redirect: routerStateSnapshot.url } });
        return false;
    }

}
