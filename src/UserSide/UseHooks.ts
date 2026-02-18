import { useState, useEffect } from "react";
import { ORDER_APIS, type OrderPayload, type OrderResponse } from "../libs/api/placeorder.api";
import { PRODUCT_APIS, type Product, type ProductsResponse } from "../libs/api/products.api";

export const useOrder = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<OrderResponse | null>(null);

    const placeOrder = async (orderData: OrderPayload) => {
        try {
            setLoading(true);
            setError(null);

            const data = await ORDER_APIS.orderPlaced(orderData);

            setSuccess(data);
            return data;
        } catch (err: any) {
            setError(err?.response?.data?.message || "Order failed");
            throw err;
        } finally {
            setLoading(false);
        }
    };

    return {
        placeOrder,
        loading,
        error,
        success,
    };
};

export const useProducts = (offset = 0, limit = 10) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [total, setTotal] = useState(0);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const data: ProductsResponse = await PRODUCT_APIS.getProducts({ offset, limit });
            setProducts(data.data);
            setTotal(data.total);
        } catch (err: any) {
            setError(err?.response?.data?.message || "Failed to fetch products");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [offset, limit]);

    return { products, loading, error, total };
};
