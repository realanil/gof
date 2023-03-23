import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

axios.defaults.headers.common = {
    'Content-Type': 'application/json',

};
/** Add interceptors */
axios.interceptors.request.use(handleRequestInterception);
axios.interceptors.response.use(handleResponseInterception, handleResponseErrorInterception);

class ApiService {
    public baseURL: string;

    constructor(baseURL: string) {
        this.baseURL = baseURL;
    }

    get(resource: string, params: object = {}, responseType?: any): any {

        return axios.get(resource, {params, responseType});
    }

    post(resource: string, body: object = {}): any {
        return axios.post(resource, body);
    }

    put(resource: string, body: object = {}): any {
        return axios.put(resource, body);
    }

    patch(resource: string, body: object = {}): any {
        return axios.patch(resource, body);
    }

    del(resource: string, params: object = {}): any {
        return axios.delete(resource, params);
    }
}

function handleRequestInterception(config: any): Promise<AxiosRequestConfig> {

    return config;
}

function handleResponseInterception(response: any): AxiosResponse<any> {

    return response && response;
}

function handleResponseErrorInterception({response}: any): any {
    const {
        status
    } = response;


    throw {error: response};
}

export default ApiService;
