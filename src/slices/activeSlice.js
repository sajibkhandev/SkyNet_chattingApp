import { createSlice } from '@reduxjs/toolkit'

export const activeSlice = createSlice({
  name: 'actives',
  initialState: {
    man:null,
  },
  reducers: {
    activeUsers: (state,action) => {
      state.man=action.payload
      
      
    
     
      
    },
  },
})
export const { activeUsers } = activeSlice.actions

export default activeSlice.reducer