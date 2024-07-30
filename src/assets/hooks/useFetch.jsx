import React, { useState, useEffect } from 'react'
import axios from 'axios';

const useFetch = (url)=>{
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    useEffect(() => {
      const fetchData = async () => {
        try {
            setLoading(true);
            const res = await axios.get(url);

            if(!res.data.success){
              setError(res.data.message);
              setLoading(false);
              return;
            }
            setData(res.data.data);
            setLoading(false);
                   
        } catch (error) {
          setError(error);
          setLoading(false);
        }
      }
      fetchData();
    }, [url]);

  
  return{
    data,error,loading
  }
}

export default useFetch

