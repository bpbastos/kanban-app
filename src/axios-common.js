import axios from "axios";
import { useLoaderStore } from '@/stores/loader'

const store = useLoaderStore()

const http = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Accept: "application/json",
  },
});

http.interceptors.request.use((config) => {
  store.setLoading(true);
  return config;
});

http.interceptors.response.use(
  (res) => {
    store.setLoading(false);
    return Promise.resolve(res.data);
  },
  (err) => {
    store.setLoading(false);
    console.log(err.response.data);
    return Promise.reject(err);
  }
);

export default http