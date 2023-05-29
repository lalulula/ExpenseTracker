import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
  //name: state 의 이름을 정의해줌
  name: "auth",
  //state의 초기값을 정해줌 (like useState)
  initialState: {
    isAuthenticated: false,
    user: {},
  },
  //reducers || actions (get/setters 처럼 액션을 하게해주는것들)
  reducers: {
    //state means the states in the initState
    setUser: (state, { payload }) => {
      // console.log(payload);
      state.user = payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = {};
      state.isAuthenticated = false;
    },
    getUser: (state) => {
      return state.user;
    },
  },
});
export const { setUser, logout, getUser } = authSlice.actions;
//or
// export const actions = authSlice.actions;

export default authSlice.reducer;
