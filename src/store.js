import { configureStore } from '@reduxjs/toolkit'
import userSlice from './slices/userSlice'
import activeUsers  from './slices/activeSlice'



export default configureStore({
  reducer: {
    sajib:userSlice,
    active:activeUsers
   
  },
})