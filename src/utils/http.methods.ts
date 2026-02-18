import axiosInstance from "./axios.config";

// Generic POST method
export const postMethod = async <T>(url: string, body: any): Promise<T> => {
    const response = await axiosInstance.post(url, body);
    return response.data;
};