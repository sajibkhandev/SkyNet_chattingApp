import React, { useEffect } from 'react'
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { getAuth, signOut } from "firebase/auth";
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { allUser } from '../slices/userSlice';

const HomePage = () => {
  let dispatch=useDispatch()
  let navigate=useNavigate()
  let activeUser=useSelector((state)=>state.user.value)
 console.log(activeUser);
  const auth = getAuth();
  let handleLogOut=()=>{
    signOut(auth).then(() => {
      navigate('/login')
      dispatch(allUser(null))
      localStorage.removeItem("user")


      
    }).catch((error) => {
      console.log(error);
    });
  }
  useEffect(()=>{
    if(activeUser==null){
      navigate('/login')
    }

  },[])
  return (
    <>
      <Button onClick={handleLogOut} variant="contained">Log Out</Button>
    </>
  )
}

export default HomePage