import { useState } from "react";
import { ORDER_APIS, type OrderPayload, type OrderResponse } from "../libs/api/placeorder.api";

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
