import axios, { AxiosError, AxiosRequestConfig } from "axios";
import { apiConfig } from "../../utils/apiConfig";
import toast from "react-hot-toast";

interface ErrorResponse {
    message: string;
}

export const saveUser = async(name: string, score?:number)=>{
    try{

        const userAxios : AxiosRequestConfig = {
            url: apiConfig.saveUser,
            method: "post",
            data: {
                name, 
                score
            }
        }
        const response = await axios(userAxios)
        console.log("response recieved : ", response)
        return response.data.data
    } catch(error){
        const axiosError = error as AxiosError<ErrorResponse>;
        console.error(axiosError);

        if (axiosError.response && axiosError.response.data) {
            toast.error("username exist")
        } else {
            toast.error('An unknown error occurred')
        }
    }
}

export const allUser = async()=>{
    try{
        const userConfig : AxiosRequestConfig = {
            url:apiConfig.allUser,
            method:"get"
        }

        const response = await axios(userConfig)
        return response.data.data
    } catch(error){
        const axiosError = error as AxiosError<ErrorResponse>;
        console.error(axiosError);

        if (axiosError.response && axiosError.response.data) {
            toast.error(axiosError.response.data.message)
        } else {
            toast.error('An unknown error occurred')
        }
    }
}

export const userUpdate = async(name: string, score: number)=>{
    try{
        const userConfig : AxiosRequestConfig = {
            url:apiConfig.updateUser,
            method:"patch",
            data:{
                name,
                score
            }
        }

        const response = await axios(userConfig)
        return response.data.data
    } catch(error){
        const axiosError = error as AxiosError<ErrorResponse>;
        console.error(axiosError);

        if (axiosError.response && axiosError.response.data) {
            toast.error(axiosError.response.data.message)
        } else {
            toast.error('An unknown error occurred')
        }
    }
}