import axios, { AxiosInstance } from 'axios';

export const client: AxiosInstance = axios.create({
  baseURL: 'http://localhost:9000/api',
});

const API_DEFAULT_TIMEOUT = 30 * 1000;

if (process.env.NEXT_PLUBLIC_ENV === 'production') {
  client.defaults.timeout = API_DEFAULT_TIMEOUT;
}

export const requestGet = ({ url, headers }: { url: string; headers?: any }) => client.get(url, {
  headers: {
    ...headers,
  },
});

export const requestPost = ({ url, headers, data }: { url: string; headers?: any, data: any }) => client.post(url, data, {
  headers: {
    ...headers,
  },
});

export const requestPut = ({ url, headers }: { url: string; headers?: any }) => client.put(url, {
  headers: {
    ...headers,
  },
});

export const requestPatch = ({ url, headers }: { url: string; headers?: any }) => client.patch(url, {
  headers: {
    ...headers,
  },
});

export const requestDelete = ({ url, headers }: { url: string; headers?: any }) => client.delete(url, {
  headers: {
    ...headers,
  },
});
