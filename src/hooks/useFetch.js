"use client";
import { useState } from "react";

export default function useFetch() {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchData = async ({
        url,
        method = "GET",
        body = null,
        headers=null
    }
    ) => {
        setLoading(true);
        try {
            const response = await fetch(url, {
                method,
                body,
               ...(headers&&headers)
            });
            const result = await response.json();
            if(result.success){
                setData(result);
            }else{
                setError(result.message);
            }
            setLoading(false);
          
        } catch (error) {
            console.log(error.message)
            setError(error);
            setLoading(false);
        }
    };
    console.log(data)
    return {
        data,
        loading,
        error,
        fetchData,
    };
}