import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import userProfile1 from '../assets/userProfile1.png'
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { getDatabase, onValue, ref, set } from "firebase/database";
import { useSelector } from 'react-redux';

const Friends = () => {
    const db = getDatabase();
    let data=useSelector((state)=>state.sajib.value)
    let [friend,setFriend]=useState([])
    useEffect(()=>{
         const friendRef = ref(db, 'friend/');
         onValue(friendRef, (snapshot) => {
            let arr=[]
         snapshot.forEach(item=>{
            arr.push({...item.val(),id:item.key});
        })
        setFriend(arr)
         
    });

    },[])
  return (
    <>
   {/* Search portion */}
   <div className='searchDiv'>
    <input className='search' type="text" placeholder='Search'/>
    <CiSearch className='searchIcon'/> 
    <BsThreeDotsVertical  className='threedotIcon'/>
    </div>
   {/* Search portion */}
    <div className='box'>
        <div className='commonHeading'>
            <h4>Friends</h4>
            <BsThreeDotsVertical />
        </div>
       <div className='scroll'>
        {/* more user */}
        {friend.map(item=>(

            <div className='main'>
                    <div className='pain'>
                    <img src={userProfile1} alt=""  className='userProfileCommon'/>
                    <div>
                        <h5>{item.reciverId==data.uid?item.senderName:item.reciverName}</h5>
                        <p>Hi Guys, Wassup!</p>
                    </div>
                    </div>
                    <p className='time'>Today, 8:56pm</p>
            </div>
        ))}
        {/* more user */}
      
       
       </div>

    </div>
    </>
  )
}

export default Friends