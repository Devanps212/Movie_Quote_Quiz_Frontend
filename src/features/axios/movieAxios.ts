import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { apiConfig } from '../../utils/apiConfig'
import toast from 'react-hot-toast';


interface ErrorResponse {
    message: string;
}

export const questionFinder = async()=>{
    try{
        const questionConfig: AxiosRequestConfig = {
            url: apiConfig.questions,
            method:'get'
        }

        const response = await axios(questionConfig)
        console.log("data got: ", response.data.data)
        return response.data.data

    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        console.error("axioserror : ",axiosError);

        if (axiosError.response && axiosError.response.data) {
            toast.error(axiosError.response.data.message)
        } else {
            toast.error('An unknown error occurred');
        }
    }
}