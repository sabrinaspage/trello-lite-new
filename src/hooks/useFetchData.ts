import { useState, useEffect } from 'react'
import { supabaseFetch } from '../api/client';

export const useFetchData = <T>(url: string, enabled: boolean = true) => {
    const [data, setData] = useState<T | null>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        if(!enabled) return;
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await supabaseFetch(url);
            const json = await response.json();
            setData(json);
          } catch (error) {
            setError((error as Error).message);
          } finally {
            setLoading(false);
          }
        };

        fetchData();
    }, [url, enabled]);

    return {data, loading, error};
}