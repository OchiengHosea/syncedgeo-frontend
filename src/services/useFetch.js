import { useState, useEffect } from "react";

export default function useFetch(url, method='GET', body=null, params=null) {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function init() {
            try {
                const fetchConfig = {};
                fetchConfig['method'] = method;
                if(body) fetchConfig['body'] = body;
                if(params) fetchConfig['params'] = params;

                const response = await fetch(url, fetchConfig);
                if(response.ok){
                    const json = await response.json();
                    setData(json);
                } else {
                    throw response;
                }
            } catch (e) {
                setError(e);
            } finally {
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        }
        init();  
    }, [url, method, body, params]);

    return {data, loading, error};
}