"use client"

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserDetailsQuery } from "@/services/auth/authService";
import { logout, setCredentials } from "@/features/auth/authSlice";


const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  
  const { data, isFetching } = useGetUserDetailsQuery("userDetails", {
    //perform refetch every 15 minutes
    pollingInterval: 900000,
  });


  useEffect(()=>{
    if(data) dispatch(setCredentials(data?.data || null))
  }, [data, dispatch])

  return <header></header>;
};

export default Header;
