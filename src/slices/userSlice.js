import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'users',
  initialState: {
    value: localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")):null,
  },
  reducers: {
    loginData: (state,action) => {
      state.value=action.payload
      
    },
  },
})
export const { loginData } = userSlice.actions

export default userSlice.reducer