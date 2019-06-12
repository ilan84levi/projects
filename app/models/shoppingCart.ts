import { Data } from '@angular/router';

export class ShoppingCart {
    constructor(
        public _id?: string,
        public customerId?: string, // forign key
        public date?: Data
    ) { };
};