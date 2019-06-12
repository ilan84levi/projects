import { Injectable } from '@angular/core';
import { Store } from '../redux/store';
import { HttpClient } from '@angular/common/http';
import { NgRedux } from 'ng2-redux';
import { Admin } from '../models/admin';
import { Observable } from 'rxjs';
import { ActionType } from '../redux/action-type';
import { Router } from '@angular/router';
import { Product } from '../models/product';
import { Image } from '../models/image';

@Injectable({
    providedIn: 'root'
})
export class AdminService {
    public isExist;

    public constructor(private httpClient: HttpClient, private router: Router, private redux: NgRedux<Store>) { }


    public CheckAdmin(admin): any {

        this.isExist = this.httpClient.post<Admin>("http://localhost:3000/api/admin/login", admin);

        this.isExist.subscribe(admin => {

            if (admin._id) {
                this.router.navigate(["admin/admin-board"]);
                sessionStorage.setItem("isLoggedIn", "true");
                const action = { type: ActionType.loginAdmin };
                this.redux.dispatch(action);
                return true
            }
            else {

                alert("Incorrect username or password :-(");
            }
        }, res => {
            alert(res.error.message)
        })

    }


    public addProduct(product): Observable<Product> {

        return this.httpClient.post<Product>("http://localhost:3000/api/products", product);

    }


    // GET ALL PRODUCTS
    public GetAllProducts(): void {
        const observable = this.httpClient.get<Product[]>("http://localhost:3000/api/products");
        observable.subscribe(products => {
            const action = { type: ActionType.GetAllProducts, payload: products };
            this.redux.dispatch(action); // Will operate the recuder function.
            console.log(products)
        })
    }

    // PATCH - UPDATE PARTIAL CANDY
    public updatePartialProduct(_id, product): Observable<Product> {
        console.log(_id)
        return this.httpClient.patch<Product>("http://localhost:3000/api/products/" + _id, product);
    }

    public getOneProductById(_id): Observable<Product> {
        return this.httpClient.get<Product>("http://localhost:3000/api/products/" + _id);
    }

}
