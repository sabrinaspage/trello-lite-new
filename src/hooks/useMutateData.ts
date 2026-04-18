import { useState, useEffect } from 'react'
import { supabaseFetch } from '../api/client';

export const useMutateData = <T>(url: string, body: object) => {
    const [data, setData] = useState<T | null>();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchData = async () => {
          setLoading(true);
          try {
            const response = await supabaseFetch(url, { method: "POST", body: JSON.stringify(body) });
            const json = await response.json();
            setData(json);
          } catch (error) {
            setError((error as Error).message);
          } finally {
            setLoading(false);
          }
        };

        fetchData();
    }, [url, body]);

    return {data, loading, error};
}