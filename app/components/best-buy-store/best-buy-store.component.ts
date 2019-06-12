import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { AdminService } from 'src/app/services/admin.service';
import { NgRedux } from 'ng2-redux';
import { Store } from 'src/app/redux/store';
import { Category } from 'src/app/models/category';
import { Product } from 'src/app/models/product';
import { Unsubscribe } from 'redux';
import { ActionType } from 'src/app/redux/action-type';
import { CustomersService } from 'src/app/services/customers.service';
import { Customer } from 'src/app/models/customer';
import { Item } from 'src/app/models/item';
import { ShoppingCart } from 'src/app/models/shoppingCart';


@Component({
    selector: 'app-best-buy-store',
    templateUrl: './best-buy-store.component.html',
    styleUrls: ['./best-buy-store.component.scss']
})
export class BestBuyStoreComponent implements OnInit {

    public categories: Category[];
    public products: Product[];
    public route: ActivatedRoute;
    private unsubscribe: Unsubscribe;
    public addProductToCard;
    public item = new Item();
    public customerCartItems: any;
    public items: Item[];
    public customer = new Customer();
    public cart = new ShoppingCart();
    public date = new Date();
    public newCart = new ShoppingCart();
    public totalPrice: number;
    public cartId: any;
    public dynamicClass: { [cssClass: string]: boolean };
    public amountError:string = "";


    constructor(private router: Router,
        private http: HttpClient,
        private adminService: AdminService,
        private productsService: ProductsService,
        private redux: NgRedux<Store>,
        private customerService: CustomersService) { }

    ngOnInit(): void {
        const categoriesFromCollection = this.productsService.GetAllCategories();
        categoriesFromCollection.subscribe(category => {
            this.categories = category;
        });

        const productsFromCollection = this.productsService.GetAllProducts();
        productsFromCollection.subscribe(product => {
            this.products = product;
        });

        let customerCart = this.customerService.checkForCart();
        if (customerCart === null || customerCart === undefined) {
            let id = localStorage.getItem("customerId")
            id = JSON.parse(id)
            let date = new Date()
            this.cart.customerId = id
            this.cart.date = date
            this.createShoppingCart(this.cart)
        }
        else {

            customerCart.subscribe(cartItems => {
                this.redux.getState().items = cartItems
                let newShoppingCart = localStorage.getItem("newShoppingCart");
                let cartId = JSON.parse(newShoppingCart)
                this.redux.getState().cartId = cartId._id;
                this.cartId = cartId._id;
                this.items = cartItems;
                let total = 0;
                for (let i = 0; i < this.items.length; i++) {
                    total += (this.items[i].amount * this.items[i].price);
                }
                this.totalPrice = total;

            })

        }



    }

    public changeCategory(id): void {

        const productsByCategories = this.productsService.GetAllProductsByCategory(id);
        productsByCategories.subscribe(product => {
            this.products = product;
        });
    }

    public showAllProducts(): void {
        this.ngOnInit();
    }

    public addToCart(item) {

        let local = localStorage.getItem("newShoppingCart")
        local = JSON.parse(local)
        this.cartId = local;

        this.item.cartId = this.cartId._id
        this.item.price = item.price;
        item.amount = this.item.amount;
        this.item.productId = item._id;
        let total = 0;
        total += (this.item.amount * this.item.price);
        this.totalPrice += total

        if (this.item.amount <= 0 || this.item.amount > 1000) {
            this.amountError = "number between 1-1000";
            alert("number must be between 1-1000")
            this.ngOnInit();
            return false;
        }
        else{
            const addItem = this.customerService.addItemToCart(this.item);
            addItem.subscribe(item => {
                this.ngOnInit();
            })
        }

    }

    public createShoppingCart(cart) {

        const newCart = this.customerService.createShoppingCart(cart);
        newCart.subscribe(newCart => {
            this.newCart = newCart
            this.redux.getState().newCart = newCart
            localStorage.setItem("newShoppingCart", JSON.stringify(newCart));
        });

    }


    public orderNow() {
        this.router.navigate(["home/shop/order"]);
    }

    public deleteItem(itemId) {
        let deleteItem = this.customerService.removeOneCartItem(itemId);
        deleteItem.subscribe(item => {
            this.ngOnInit();
        });
    }


    public serchProduct(val){
        let products = this.productsService.GetProductsBySearch(val);
        products.subscribe(product =>{
            this.products = product ;
        });
        
    }

    public deleteAllItems(){
        let cartId = JSON.parse(localStorage.getItem("newShoppingCart"));
        let deleteAll = this.customerService.removeAllCartItems(cartId._id);
        deleteAll.subscribe(() =>{
            this.ngOnInit();
        });
    }

}


