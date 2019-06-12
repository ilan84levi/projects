export class Order {
    constructor(
        public _id?: string,
        public customerId?: string, // forign key
        public cartId?: string, // forign key
        public finelPrice?: number,
        public city?: string,
        public street?: string,
        public houseNumber?: string,
        public date?: string,
        public creditCard?: string,
    ) { };
};