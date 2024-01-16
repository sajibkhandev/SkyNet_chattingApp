import React, { useEffect, useState } from 'react'

import Button from '@mui/material/Button';
import userProfile1 from '../assets/userProfile1.png'
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { getDatabase, ref, onValue } from "firebase/database";
import { useSelector } from 'react-redux';



const GroupsList = () => {
    const db = getDatabase();
    let data =useSelector((state)=>state.sajib.value)
    let [group,setGroup]=useState([])

      useEffect(()=>{
     const groupRef = ref(db, 'group/');
         onValue(groupRef, (snapshot) => {
            let arr=[]
         snapshot.forEach(item=>{
            arr.push({...item.val(),id:item.key});
            
        })
        setGroup(arr)
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
            <h4>Groups</h4>
            <BsThreeDotsVertical />
        </div>
       <div className='scroll'>
        {/* more user */}
        {group.map(item=>(

            <div className='main'>
                    <div className='pain'>
                    <img src={item.coverPhoto} alt=""  className='userProfileCommon'/>
                    <div>
                        <h5>{item.groupName}</h5>
                        <p>Hi Guys, Wassup!</p>
                    </div>
                    </div>
                    <Button className='button' variant="contained"></Button>
            </div>
        ))}
           
        {/* more user */}
       </div>

    </div>
      </>
  )
}

export default GroupsList