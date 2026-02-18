import { getMethod } from "../../utils/http.methods";

export interface Product {
    id: number;
    name: string;
    price: number;
    weight: string;
    image: string;
    description: string;
    stock_quantity: number;
}

export interface ProductsResponse {
    data: Product[];
    current: number;
    offset: number;
    limit: number;
    total: number;
}

export const API_ENDPOINTS = {
    GET_PRODUCTS: "/gold/products",
};

export const PRODUCT_APIS = {
    getProducts: (params?: { offset?: number; limit?: number }) =>
        getMethod<ProductsResponse>(API_ENDPOINTS.GET_PRODUCTS, params),
};
