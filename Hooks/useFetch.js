import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useFetchRequest = (url, onSuccess, onError, responseType="json") => {
  const mutation = useMutation({
    mutationFn: async (authorize = true) => {
      const accessToken = Cookies.get("userToken");
      const headers = {
        "Content-Type": "application/json",
      };
      if (accessToken && authorize) {
        headers.Authorization = `Bearer ${accessToken}`;
      }
      return await axios.get(url, { headers, responseType });
    },
    onSuccess,
    onError,
  });

  const { mutate, isLoading, isSuccess, isError } = mutation;
  return {
    mutate,
    isLoading,
    isSuccess,
    isError,
  };
};

export default useFetchRequest;
