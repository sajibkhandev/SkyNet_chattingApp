import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    value: localStorage.getItem("user")? JSON.parse(localStorage.getItem("user")):null,
  },
  reducers: {
    allUser: (state,action) => {
        state.value=action.payload
    
    }
  },
})

export const {allUser} = userSlice.actions

export default userSlice.reducer