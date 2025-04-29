/* eslint-disable */
import { BASE_API } from '@/constants/environment';
import { ApiResponse } from '@/types/api.type';
import { RequestParams } from '@/types/rest.type';
import axios, {
  AxiosInstance,
  type AxiosRequestConfig,
  type AxiosResponse,
} from 'axios';

export class RestService {
  private static instance: RestService;
  private axiosInstance: AxiosInstance;

  private constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE_API,
    });
    // Optional: Set up interceptors for request/response
    this.axiosInstance.interceptors.response.use(
      (response) => response, // Successful response
      (error) => {
        // Handle error globally
        console.error('API Error:', error.response || error.message);
        throw error;
      },
    );
  }

  public static getInstance(): RestService {
    RestService.instance ??= new RestService();
    return RestService.instance;
  }

  public async create({
    path,
    payload = {},
    params,
    token,
    type = 'json',
  }: RequestParams): Promise<AxiosResponse<ApiResponse>> {
    const formData = new FormData();
    if (type === 'form') {
      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
      });
    }

    const config: AxiosRequestConfig = {
      params,
      headers: {
        ...(type === 'form' ? { 'Content-Type': 'multipart/form-data' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    return await this.axiosInstance.post(
      path,
      type === 'json' ? payload : formData,
      config,
    );
  }

  public async list({
    path,
    params,
    token,
  }: RequestParams): Promise<AxiosResponse<ApiResponse>> {
    const config: AxiosRequestConfig = {
      params,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    };

    return await this.axiosInstance.get(path, config);
  }

  public async update({
    path,
    payload = {},
    params,
    token,
    type = 'json',
  }: RequestParams): Promise<AxiosResponse<ApiResponse>> {
    const formData = new FormData();
    if (type === 'form') {
      Object.keys(payload).forEach((key) => {
        formData.append(key, payload[key]);
      });
    }

    const config: AxiosRequestConfig = {
      params,
      headers: {
        ...(type === 'form' ? { 'Content-Type': 'multipart/form-data' } : {}),
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
    };

    return await this.axiosInstance.patch(
      path,
      type === 'json' ? payload : formData,
      config,
    );
  }

  public async remove({
    path,
    params,
    token,
  }: RequestParams): Promise<AxiosResponse<ApiResponse>> {
    const config: AxiosRequestConfig = {
      params,
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    };

    return await this.axiosInstance.delete(path, config);
  }
}
