export type ResponseType =
    | 'arraybuffer'
    | 'text'


export type DataType =
    | 'json'
    | ''

export interface AxiosRequestConfig {
    baseUrl?: string;
    header?: any;
    data?: any;
    timeout?: number;
    loading?: string;
    loadingAwait?: number;
    loadingMask?: boolean;
    dataType?: DataType;
    responseType?: ResponseType;
    enableHttp2?: boolean;
    enableQuic?: boolean;
    enableCache?: boolean;
}

export interface AxiosResponse<T = any> {
    data: T;
    statusCode: number;
    header?: any;
    config: AxiosRequestConfig;
    errMsg?: string;
    cookies: any;
}

export interface AxiosError<T = any> extends Error {
    data: T;
    headers: any;
    config: AxiosRequestConfig;
    statusCode?: number;
    errMsg?: string;
    cookies: any;
}

export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {
}

export interface AxiosInterceptorManager<V> {
    use(onFulfilled?: (value: V) => V | Promise<V>, onRejected?: (error: any) => any): number;
    eject(id: number): void;
}

export interface AxiosInstance {
    defaults: AxiosRequestConfig;
    interceptors: {
        request: AxiosInterceptorManager<AxiosRequestConfig>;
        response: AxiosInterceptorManager<AxiosResponse>;
    };
    get<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    delete<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    head<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    options<T = any, R = AxiosResponse<T>>(url: string, config?: AxiosRequestConfig): Promise<R>;
    post<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
    put<T = any, R = AxiosResponse<T>>(url: string, data?: any, config?: AxiosRequestConfig): Promise<R>;
}

export interface AxiosStatic extends AxiosInstance {
    all<T>(values: (T | Promise<T>)[]): Promise<T[]>;
    spread<T, R>(callback: (...args: T[]) => R): (array: T[]) => R;
}

declare const Axios: AxiosStatic;

export default Axios;
