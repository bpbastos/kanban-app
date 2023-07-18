import axios from "axios";

const http = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json",
  },
})

export const parse = axios.create({
  baseURL: "http://localhost:1337/parse",
  headers: {
    "X-Parse-Application-Id": "kanbanapp",
    "X-Parse-REST-API-Key": "6VZVehnGi2mqN2dMjjQxHr1kgBHYm9q2",
    "Content-type": "application/json"    
  },
})


export default http
