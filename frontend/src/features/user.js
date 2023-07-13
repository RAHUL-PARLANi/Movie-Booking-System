import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "users",
  initialState: { value: {
    emailId: "",
    role: "",
    userId: 0,
    userName: "",
    isAuthenticated: false,
  } },
  reducers: {
    login: (state, action) => {
      state.value.isAuthenticated=true
      state.value.role=action.payload.role
      state.value.emailId=action.payload.emailId
      state.value.userId=action.payload.userId
      state.value.userName=action.payload.userName

      localStorage.setItem("user",JSON.stringify({isAuthenticated:true,role:action.payload.role,emailId:action.payload.emailId,userId:action.payload.userId,userName:action.payload.userName}))
    },
    logout:(state,action)=>{
      state.value.role=""
      state.value.emailId=""
      state.value.userId=0
      state.value.userName=""
      state.value.isAuthenticated=false
      localStorage.removeItem("user")
    }
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;