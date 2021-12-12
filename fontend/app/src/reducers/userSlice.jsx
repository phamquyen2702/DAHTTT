import jwtDecode from "jwt-decode";
import userApi from "../api/userApi";
import setcookie from "../component/setcookie";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const register = createAsyncThunk("auth/register", async (payload) => {
  //call api to register
  const data = await userApi.register(payload);
  return data;
});

export const login = createAsyncThunk("auth/login", async (payload) => {
  //call api to login
  const data = await userApi.login(payload);
  //set lại exprie từ chuỗi json trả về
  setcookie("user", JSON.stringify(jwtDecode(data)), 15);
  setcookie("accessToken", data);
  return data;
});
const userSlice = createSlice({
  name: "user",
  initialState: {
    current: {},
    settings: {},
  },
  reducers: {},
  extraReducers: {
    [register.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { reducers } = userSlice;
export default reducers;
