import React, { useEffect } from 'react'
import profile from '../assets/profile.png'
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginData } from '../slices/userSlice';

const Sideber = () => {
    const auth = getAuth();
    let navigate=useNavigate()
    let dispatch=useDispatch()
    let data=useSelector((state)=>(state.sajib.value))
    let pathname=window.location.pathname.replace("/","")

    let handleLogOut=()=>{
        signOut(auth).then(() => {
          navigate('/login')
          dispatch(loginData(null))
          localStorage.removeItem("activeUser")
          // Sign-out successful.
        })
      }
      useEffect(()=>{
        if(data==null){
          navigate("/login")
        }
      },[])
    
    
  return (
    <div className='sideber'>
        <div>
        <img src={profile} alt="" className='mainProfile'/>
        <div className='sideIcon'>
            <Link to='/home' className={`${pathname=="home"&&"active"}`}>
            <IoHomeOutline  className='commonIcon'/>
            </Link>
            <Link to='/message' className={`${pathname=="message"&&"active"}`}>
            <AiOutlineMessage  className='commonIcon'/>
            </Link>
            <Link to='/notification' className={`${pathname=="notification"&&"active"}`}>
            <IoMdNotificationsOutline  className='commonIcon'/>
            </Link>
            <Link to='/setting' className={`${pathname=="setting"&&"active"}`}>
            <IoSettingsOutline  className='commonIcon'/>
            </Link>
        </div>
        </div>
        <IoIosLogOut onClick={handleLogOut}  className='logoutIcon'/>

    </div>
  )
}

export default Sideber