import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Store } from 'redux';
import { NgRedux } from 'ng2-redux';
import { Category } from '../models/category';
import { Observable } from 'rxjs';
import { Product } from '../models/product';
import { Order } from '../models/order';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private httpClient: HttpClient, private router: Router, private redux: NgRedux<Store>) { }

    public GetAllCategories(): Observable<Category[]> {
        return this.httpClient.get<Category[]>("http://localhost:3000/api/categories/list");
    }

    public GetAllProducts(): Observable<Product[]> {
        return this.httpClient.get<Product[]>("http://localhost:3000/api/products");
    }

    public GetAllOrders(): Observable<Order[]> {
        return this.httpClient.get<Order[]>("http://localhost:3000/api/orders");
    }

    public GetAllProductsByCategory(id): Observable<Product[]> {
        return this.httpClient.get<Product[]>("http://localhost:3000/api/products/" + id);
    }

    public GetProductsBySearch(string): Observable<Product[]> {
        return this.httpClient.get<Product[]>("http://localhost:3000/api/products/search/" + string);
    }

}
