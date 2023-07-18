import axios from "axios";
import { useLoaderStore } from '@/stores/loader'

const http = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json",
  },
})

export default http
