const useGetResponseMessage = () => {
  return (response, fallback="-") => {
    if (response?.response?.data.message) {
      return response.response.data.message;
    }
    if (response?.data?.message) {
      return response.data.message;
    }

    return fallback

  };
};

export default useGetResponseMessage;
