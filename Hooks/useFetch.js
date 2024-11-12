import axios from "axios";
import {useState, useCallback, useEffect} from "react";

/**
 * Custom hook for fetching data with axios.
 * @param {Object} options - Configuration options for the hook.
 * @param {string} options.url - The URL to fetch data from.
 * @param {function} options.onSuccess - Callback function to handle a successful response.
 * @param {function} options.onError - Callback function to handle an error response.
 * @returns {Object} { makeRequest, response, loading, error }
 */
const useFetchData = ({url, onSuccess=(res)=>{}, onError =(error)=>{}}) => {
  const [error, setError] = useState(null);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);

  const makeRequest = useCallback(async () => {
    console.log("Loading")
    setLoading(true);
    try {
      const response = await axios.get(url);
      if (response.status === 200 || response.status === 201 ){
          onSuccess(response)
      }
      setResponse(response);
    } catch (error) {
      onError(error)
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [url, onSuccess, onError]);

  useEffect(()=>{
    makeRequest()
  }, [])

  return {
    response,
    loading,
    error,
    makeRequest
  };
};

export default useFetchData;
