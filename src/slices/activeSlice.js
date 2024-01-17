import { createSlice } from '@reduxjs/toolkit'

export const activeSlice = createSlice({
  name: 'actives',
  initialState: {
    man:localStorage.getItem("userData")?JSON.parse(localStorage.getItem("userData")):null,
  },
  reducers: {
    activeUsers: (state,action) => {
      state.man=action.payload
    },
  },
})
export const { activeUsers } = activeSlice.actions

export default activeSlice.reducer