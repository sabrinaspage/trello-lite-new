import { useState, useEffect, useCallback } from 'react';
import { supabaseFetch } from '../api/client';

export const useFetchData = <T>(url: string, enabled: boolean = true) => {
  const [data, setData] = useState<T | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    if (!enabled) return;
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
  }, [url, enabled]);

  // only runs when url and enabled have changed
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [fetchData]);

  // refetch is a manual call to the SAME fetchData we saw before
  return { data, loading, error, refetch: fetchData };
};
