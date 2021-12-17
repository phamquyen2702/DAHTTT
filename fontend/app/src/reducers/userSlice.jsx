import jwtDecode from "jwt-decode";
import userApi from "../api/userApi";
import setcookie from "../component/setcookie";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

export const registers = createAsyncThunk(
  "account/register",
  async (payload) => {
    //call api to register
    const data = await userApi.register(payload);
    return data;
  }
);

export const login = createAsyncThunk("account/login", async (payload) => {
  //call api to login
  const data = await userApi.login(payload);
  //set lại exprie từ chuỗi json trả về
  setcookie("account", JSON.stringify(jwtDecode(data.access_token)), 90);
  setcookie("accessToken", data.access_token, 90);
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
    [registers.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
    [login.fulfilled]: (state, action) => {
      state.current = action.payload;
    },
  },
});

const { reducers } = userSlice;
export default reducers;
