import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { baseBeUrl } from "@/urls/be";
import { handleGenericError } from "@/utils/errorHandler";
import Cookies from "js-cookie";

export const userLogout = createAsyncThunk(
  "auth/logout",
  async ({}, { rejectWithValue }) => {
    console.log("logout")
    const refresh = Cookies.get("refreshToken");
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${Cookies.get("userToken")}`,
        },
      };

      const { data } = await axios.post(`${baseBeUrl}/auth/logout`, {refresh_token: refresh}, config);
      Cookies.remove('userToken')
      Cookies.remove("refreshToken");
      return data;
    } catch (error) {
      return rejectWithValue(handleGenericError(error));
    }
  }
);

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `${baseBeUrl}/auth/login/`,
        { email, password },
        config
      );

      Cookies.set("userToken", data.data.access_token, { expires: 1 });
      Cookies.set("refreshToken", data.data.refresh_token, { expires: 1 });
      return data;
    } catch (error) {
      return rejectWithValue(handleGenericError(error));
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ firstName, lastName, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      await axios.post(
        `${baseBeUrl}/auth/register`,
        { first_name: firstName, last_name: lastName, email, password },
        config
      );
    } catch (error) {
      return rejectWithValue(handleGenericError(error));
    }
  }
);
