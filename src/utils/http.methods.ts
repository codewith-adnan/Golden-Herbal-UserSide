import axiosInstance from "./axios.config";

// Generic POST method
export const postMethod = async <T>(url: string, body: any): Promise<T> => {
    const response = await axiosInstance.post(url, body);
    return response.data;
};

export const getMethod = async <T>(url: string, params?: any): Promise<T> => {
    const response = await axiosInstance.get(url, { params });
    return response.data;
};