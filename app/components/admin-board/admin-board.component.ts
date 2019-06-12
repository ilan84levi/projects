import { Component, OnInit ,  Input, EventEmitter, Output, } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminService } from 'src/app/services/admin.service';
import { Category } from 'src/app/models/category';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/models/product';
import { Unsubscribe } from 'redux';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { ActionType } from 'src/app/redux/action-type';

@Component({
    selector: 'admin-board',
    templateUrl: './admin-board.component.html',
    styleUrls: ['./admin-board.component.scss'],
    inputs:['forUpdate']
    
})
export class AdminBoardComponent implements OnInit {
    @Input()
    public forUpdate;

    public categories: Category[];
    public products: Product[];
    public mainProductPage:string = "flex";
    public route: ActivatedRoute;
    private unsubscribe: Unsubscribe;

    constructor(private router: Router,
                private http: HttpClient,
                private adminService: AdminService,
                private productsService: ProductsService,
                private redux: NgRedux<Store>) { }

    ngOnInit(): void {
        const categoriesFromCollection = this.productsService.GetAllCategories();
        categoriesFromCollection.subscribe(category => {
            this.categories = category;
        });

        const productsFromCollection = this.productsService.GetAllProducts();
        productsFromCollection.subscribe(product => {
            this.products = product;
        });
    }

    public showAllProducts():void{
        this.mainProductPage = "flex";
        this.ngOnInit();
    }

    public addProduct():void{
        this.router.navigate(["admin/admin-board/app-add-product"], {relativeTo:this.route} );

    }

    public changeCategory(id):void{
       
        const productsByCategories = this.productsService.GetAllProductsByCategory(id);
        productsByCategories.subscribe(product => {
            this.products = product;
        });
    }

    public updateProduct(p):void{

        this.forUpdate = p;
        const action = { type: ActionType.UpdateProduct, payload: this.forUpdate };
        this.redux.dispatch(action); // Will operate the recuder function.
        this.router.navigate(["admin/admin-board/app-update-product",p._id], {relativeTo:this.route} );
    }

}
