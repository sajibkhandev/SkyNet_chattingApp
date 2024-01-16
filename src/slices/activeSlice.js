import { createSlice } from '@reduxjs/toolkit'

export const activeSlice = createSlice({
  name: 'actives',
  initialState: {
    man:"sajib",
  },
  reducers: {
    activeUsers: (state,action) => {
      state.active=action.payload
    // console.log(action.payload);
     
      
    },
  },
})
export const { activeUsers } = activeSlice.actions

export default activeSlice.reducer