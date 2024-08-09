import React, {useState, useEffect} from 'react';
import { Alert } from 'react-native';
export const useAppwrite = (fn) => {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect( () => {
        // fetch data
        fetchData();
        setIsLoading(false);
    }, []);

    const fetchData = async () => {
        // fetch data
        setIsLoading(true);
        try{
            const response = await fn();
            setData(response);
        }catch(err){
            Alert.alert('Error in getting videos for home', err.message);
        }finally{
            setIsLoading(false);
        }
    }

    const refetch = () => {
         fetchData();
    }

    return {data, isLoading, refetch}
}

