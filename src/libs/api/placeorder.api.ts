import { postMethod } from "../../utils/http.methods";

export interface OrderItem {
    product_id: number;
    quantity: number;
    weight: string;
}

export interface OrderPayload {
    customer_name: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    items: OrderItem[];
}

export interface OrderResponse {
    order_id: number;
    status: string;
}

export const API_ENDPOINTS = {
    USE_ORDER: "/gold/orders",
};

export const ORDER_APIS = {
    orderPlaced: (body: OrderPayload) => postMethod<OrderResponse>(API_ENDPOINTS.USE_ORDER, body),
};
