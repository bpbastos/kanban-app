import axios from "axios";
import { useLoaderStore } from '@/stores/loader'

const http = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json",
  },
});

http.interceptors.request.use((config) => {
  const store = useLoaderStore()
  store.setLoading(true);
  return config;
});

http.interceptors.response.use(
  (res) => {
    const store = useLoaderStore()    
    store.setLoading(false);
    return Promise.resolve(res.data);
  },
  (err) => {
    const store = useLoaderStore()    
    store.setLoading(false);
    console.log(err.response.data);
    return Promise.reject(err);
  }
);

export default http