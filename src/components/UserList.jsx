import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import userProfile1 from '../assets/userProfile1.png'
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue } from "firebase/database";
import Search from './Search'

const UserList = () => {
    const db = getDatabase();
    let [allUser,setAllUser]=useState([])

    useEffect(()=>{
        const starCountRef = ref(db, 'all user');
        onValue(starCountRef, (snapshot) => {
            let arr=[]
            snapshot.forEach(item=>{
                arr.push(item.val());
            })
            setAllUser(arr)
      });
    },[])

  return (
   <>
   <Search/>
   <div className='box box2'>
    <div className='commonHeading'>
        <h4>User List</h4>
        <BsThreeDotsVertical />
    </div>
   <div className='scroll'>
    {/* more user */}
    {allUser.map(item=>(
        <div className='main'>
        <div className='pain'>
        <img src={userProfile1} alt=""  className='userProfileCommon'/>
        <div>
            <h5>{item.username.substring(0,14)}</h5>
            <p>Hi Guys, Wassup!</p>
        </div>
        </div>
        <Button className='button' variant="contained">Join</Button>
</div>
    ))}
    {/* more user */}
   </div>

</div>
   </>
  )
}

export default UserList