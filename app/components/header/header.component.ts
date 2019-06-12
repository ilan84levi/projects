import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { HttpClient } from '@angular/common/http';
import { CustomersService } from 'src/app/services/customers.service';
import { Router } from '@angular/router';
import { Unsubscribe } from 'redux';
import { ActionType } from 'src/app/redux/action-type';
import { Customer } from 'src/app/models/customer';
import { store } from '@angular/core/src/render3';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

    public currentUser = new Customer();
    public dynamicLogOutBtn: { [cssClass: string]: boolean };
    public dynamicWellcomeCustomer: { [cssClass: string]: boolean };
    public dynamicWellcomeGuest: { [cssClass: string]: boolean };
    public dynamicShopBtn: { [cssClass: string]: boolean };
    public dynamicLogOutAdminBtn: { [cssClass: string]: boolean };
    public currentCustomerFromStore: boolean;
    private unsubscribe: Unsubscribe;

    constructor(private router: Router, private redux: NgRedux<Store>, private http: HttpClient, private customerService: CustomersService) { }

    ngOnInit() {

        let adminFromSession = JSON.parse(sessionStorage.getItem("isLoggedIn"));

        this.unsubscribe = this.redux.subscribe(() => {
            let adminFromStore = this.redux.getState().isLoggedIn;
            if ( adminFromStore === true || adminFromSession === true) {
                this.dynamicLogOutAdminBtn = { "logOutAdmin-h6": true, "logOut-btn-admin-hidden": false };
            }
        })


        let customerFromLocal = localStorage.getItem("customerId");

        if (customerFromLocal != null && customerFromLocal != undefined) {
            customerFromLocal = JSON.parse(customerFromLocal);
            let currentCustomer = this.customerService.getCustomer(customerFromLocal);
            currentCustomer.subscribe(customer => {
                this.currentUser = customer;

            });
        }

        if (customerFromLocal) {

            this.dynamicLogOutBtn = { "visible": true, "logOut-btn": false };
            this.dynamicWellcomeCustomer = { "visible": true };
            this.dynamicWellcomeGuest = { "hidden": true, "h6-guest-wellcome": false };
            this.dynamicShopBtn = { "hidden": false };

        }
        else {

            this.dynamicLogOutBtn = { "hidden": true };
            this.dynamicWellcomeGuest = { "visible": true, "h6-guest-wellcome": true };
            this.dynamicWellcomeCustomer = { "visible": false };
            this.dynamicShopBtn = { "hidden": true };

        }

        this.homePageUpload();

    }

    public logOut(): void {
        localStorage.removeItem("customerId");
        localStorage.removeItem("newShoppingCart");

        let action = { type: ActionType.logOutCustomer };
        this.redux.dispatch(action);

        this.unsubscribe = this.redux.subscribe(() => {
            this.redux.getState().customerLoggedIn
            this.ngOnInit()
        });

        this.dynamicLogOutBtn = { "hidden": true, "visible": false };
        this.router.navigate(["/home"]);
        this.dynamicWellcomeCustomer = { "visible": false };
    }

    public ngOnDestroy(): void {
        this.unsubscribe();
    }


    public homePageUpload(): void {

        let userFromLocal = localStorage.getItem("customerId");
        userFromLocal = JSON.parse(userFromLocal);

        this.unsubscribe = this.redux.subscribe(() => {
            this.currentCustomerFromStore = this.redux.getState().customerLoggedIn;

            if (this.currentCustomerFromStore === true || userFromLocal) {

                this.dynamicLogOutBtn = { "visible": true, "logOut-btn": false };
                this.dynamicWellcomeCustomer = { "visible": true };
                this.dynamicWellcomeGuest = { "hidden": true, "h6-guest-wellcome": false };
                this.dynamicShopBtn = { "hidden": false };
            }
            else {
                this.dynamicLogOutBtn = { "hidden": true };
                this.dynamicWellcomeGuest = { "visible": true, "h6-guest-wellcome": true };
                this.dynamicWellcomeCustomer = { "hidden": true, };
                this.dynamicShopBtn = { "hidden": true, };
            }

        });

    }

    public logOutAdmin() {
        sessionStorage.removeItem("isLoggedIn");
        this.dynamicLogOutAdminBtn = { "logOutAdmin-h6": false, "logOut-btn-admin-hidden": true };
        this.router.navigate(["/home"]);
    }

}
