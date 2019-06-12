import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CustomersService } from 'src/app/services/customers.service';
import { City } from 'src/app/models/city';
import { Customer } from 'src/app/models/customer';
import { Router } from '@angular/router';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';

@Component({
    selector: 'register',
    templateUrl: './customer-register.component.html',
    styleUrls: ['./customer-register.component.scss']
})
export class CustomerRegisterComponent implements OnInit {
    public cities: City[];
    public customer = new Customer();
    constructor(private redux: NgRedux<Store>, private http: HttpClient, private customersServics: CustomersService, private router: Router) { }

    ngOnInit() {
        const cities = this.customersServics.getCitiesList();
        cities.subscribe(city => {
            this.cities = city
        });
    }

    register() {
        const reg = this.customersServics.addCustomer(this.customer);
        reg.subscribe(customer => {

            localStorage.setItem("customerId", JSON.stringify(customer._id))
            this.router.navigate(["home"]);

        })
    }

}
