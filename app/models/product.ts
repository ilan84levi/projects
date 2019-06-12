export class Product {
    constructor(
        public _id?: string,
        public productName?: string,
        public categoryName?: string, // forign key
        public price?: any,
        public productImage?: string
    ) { };
};