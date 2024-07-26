import axios, { AxiosError, AxiosRequestConfig } from 'axios'
import { apiConfig } from '../../utils/apiConfig'

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
        console.log(response.data)
        return response.data.data

    } catch (error) {
        const axiosError = error as AxiosError<ErrorResponse>;
        console.error(axiosError);

        if (axiosError.response && axiosError.response.data) {
            throw new Error(axiosError.response.data.message);
        } else {
            throw new Error('An unknown error occurred');
        }
    }
}