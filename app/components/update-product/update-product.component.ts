import { Component, OnInit } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ProductsService } from 'src/app/services/products.service';
import { HttpClient } from '@angular/common/http';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { ActionType } from 'src/app/redux/action-type';
import { Unsubscribe } from 'redux';
import { store } from '@angular/core/src/render3';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-update-product',
    templateUrl: './update-product.component.html',
    styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {

    public categories: Category[];
    public product = new Product();
    public productToUpdate = new Product();
    public route: ActivatedRoute;
    public priceError: string = "";

    constructor(
        private adminService: AdminService,
        private productsService: ProductsService,
        private http: HttpClient,
        private redux: NgRedux<Store>,
        private router: Router
    ) {

    }

    ngOnInit(): void {
        this.productToUpdate = this.redux.getState().productToUpdate
        this.redux.subscribe(() => {
            let productCh = this.redux.getState().productToUpdate
            this.productToUpdate = productCh
            console.log(productCh)
        })

        const categoriesFromCollection = this.productsService.GetAllCategories();
        categoriesFromCollection.subscribe(category => {
            this.categories = category;
        });

    }

    selectedFile: File = null;
    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0]
        console.log(this.selectedFile)
    }

    onUpload() {
        if (this.product.price <= 0 || this.product.price > 1000) {
            this.priceError = "number between 1-1000";
            return false;
        }

        let fd = new FormData()

        fd.append("productName", this.product.productName);
        fd.append("categoryName", this.product.categoryName);
        fd.append("price", this.product.price);
        if (this.selectedFile) {
            fd.append("productImage", this.selectedFile, this.selectedFile.name);
        }

        const newProduct = this.adminService.updatePartialProduct(this.productToUpdate._id, fd);
        newProduct.subscribe(p => {
            console.log(p)
        })

    }

}
