import axios from "axios";
import apiUrl from "../Axios";

export const emailApiCall=async (formData)=>{
    
       const res= await axios.post(`${apiUrl}/public/send-email`, formData);
        return res;
    
    }
