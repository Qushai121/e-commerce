import { User } from "@/types";
import { Product } from "./Product";
import { Store } from "./Store";

export type ProductTransaction = {
    created_at: string;
    discount: number;
    id: number;
    product_id: number;
    quantity: number;
    status: string;
    store_id: number;
    total_price: number;
    updated_at: string;
    customer_id: number;
};

export type ProductTransactionWithStoreAndProduct = {
    product: Pick<Product, 'id' | 'product_name' | 'image'>,
    store: Pick<Store, 'id' | 'store_name' | 'user_id'>,
    user: Pick<User,'name'>
} & ProductTransaction;