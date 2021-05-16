import {AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse} from "axios";
import Auth from '../Auth/Auth';

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
    const userProfile: any = Auth.getUserProfile();
    if (userProfile != null) {
        config.headers.Authorization = `Bearer ${userProfile.credentials.access_token}`
    }
    return config;
}

export function setupInterceptorsTo(axiosInstance: AxiosInstance): AxiosInstance {
    axiosInstance.interceptors.request.use(onRequest);
    return axiosInstance;
}