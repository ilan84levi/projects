import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductsService } from 'src/app/services/products.service';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

    public categories: Category[];
    public product = new Product();
    public priceError:string = "";

    ngOnInit(): void {
        const categoriesFromCollection = this.productsService.GetAllCategories();
        categoriesFromCollection.subscribe(category => {
            this.categories = category;
        });
    }

    constructor(
        private adminService: AdminService,
        private productsService: ProductsService,
        private http: HttpClient
    ) {

    }


    selectedFile: File = null;
    onFileSelected(event) {
        this.selectedFile = <File>event.target.files[0]
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
        fd.append("productImage", this.selectedFile, this.selectedFile.name);

        const newProduct = this.adminService.addProduct(fd);
        newProduct.subscribe(p => {

        })

    }

}
