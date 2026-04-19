import { useState, useEffect, useCallback } from 'react';
import { supabaseFetch } from '../api/client';

export const useMutateData = <T>(url: string, body: object, enabled: boolean = true) => {
  const [data, setData] = useState<T | null>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const fetchData = useCallback(async () => {
    if (!enabled) return;
    setLoading(true);
    try {
      const response = await supabaseFetch(url, {
        method: 'POST',
        body: JSON.stringify(body),
      });
      const json = await response.json();
      setData(json);
    } catch (error) {
      setError((error as Error).message);
    } finally {
      setLoading(false);
    }
  }, [url, body, enabled]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch: fetchData };
};
