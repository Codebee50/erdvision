/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";

const useDelete = () => {
  return (url, onSuccess, onError) => {
    const mutation = useMutation({
      mutationFn: async (data, authorize = true) => {
        const accessToken = Cookies.get('userToken');

        const headers = {
          "Content-Type": "application/json",
        };

        if (accessToken && authorize) {
          headers.Authorization = `Bearer ${accessToken}`;
        }

        return await axios.delete(url, { headers });
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
};

export default useDelete;
