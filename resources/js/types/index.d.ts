import { Product } from "@/model/Product";
import { Store } from "@/model/Store";

export interface User {
    id: number;
    name: string;
    email: string;
    email_verified_at: string;
    specialAccess: string[];
    avatar: string

}

export type PageProps<T extends Record<string, unknown> = Record<string, unknown>> = T & {
    auth: {
        user: User,
    };
    datas: any,
    mystores: {
        stores: Pick<Store, 'store_name' | 'id'>[],
        chosenStore: string | null
    },
    flash: {
        error: string | null,
        message: string | null,
        success: string | null,
    }
};

// minta gpt aja bang biar cepet
export type PaginateResponse<T> = {
    current_page: number;
    data: T[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
};