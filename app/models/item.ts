export class Item {
    constructor(
        public _id?: string,
        public productId?: string,
        public amount: number = 1,
        public price?: number,
        public cartId?: string
    ) { };
};