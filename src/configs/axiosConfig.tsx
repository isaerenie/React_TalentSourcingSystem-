import axios from "axios";
 
 

const baseUrl = 'http://localhost:8090/'
const timeout = 15000;
export const siteConfig = axios.create({
    baseURL: baseUrl,
    timeout: timeout
})