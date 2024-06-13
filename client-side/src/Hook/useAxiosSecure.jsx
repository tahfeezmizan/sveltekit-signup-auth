import axios from "axios";
import { useEffect } from "react";
import { API_URL } from "../constant";

const AxiosSecure = axios.create({
    baseURL: `${API_URL}`,
    withCredentials: true,
})

const useAxiosSecure = () => {
    useEffect(() => {
        AxiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            // console.log('error in the interceptor', error.response);
            if (error.response.status === 401 || error.response.status === 403){
                // console.log('logout user');
            }
        })

    }, [])

    return AxiosSecure
};

export default useAxiosSecure;