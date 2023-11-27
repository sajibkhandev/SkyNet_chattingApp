import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import userProfile1 from '../assets/userProfile1.png'
import { BsThreeDotsVertical } from "react-icons/bs";
import { getDatabase, ref, onValue } from "firebase/database";
import { CiSearch } from "react-icons/ci";


const UserList = () => {
    const db = getDatabase();
    let [allUser,setAllUser]=useState([])
    let [search,setSearch]=useState([])
    let [input,setInput]=useState("")

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
    let handleSearch=(e)=>{
        setInput(e.target.value)
        let result= allUser.filter(item=>item.username.toLowerCase().includes(e.target.value.toLowerCase()))
        setSearch(result);
    }

  return (
   <>
   {/* Search portion */}
   <div className='searchDiv'>
    <input onChange={handleSearch}  className='search' type="text" placeholder='Search'/>
    <CiSearch className='searchIcon'/> 
    <BsThreeDotsVertical  className='threedotIcon'/>
    </div>
   {/* Search portion */}
   <div className='box box2'>
    <div className='commonHeading'>
        <h4>User List</h4>
        <BsThreeDotsVertical />
    </div>
   <div className='scroll'>
    {/* more user */}
    {input.length>0?
    search.length>0?
    search.map(item=>(
        <div className='main'>
        <div className='pain'>
        <img src={item.profile_picture} alt=""  className='userProfileCommon'/>
        <div>
            <h5>{item.username.substring(0,14)}</h5>
            <p>Hi Guys, Wassup!</p>
        </div>
        </div>
        <Button className='button' variant="contained">+</Button>
        </div>
         )) 
    :
    <h2 className='searchError'>User Blank:</h2>
    :
    allUser.map(item=>(
        <div className='main'>
        <div className='pain'>
        <img src={item.profile_picture} alt=""  className='userProfileCommon'/>
        <div>
            <h5>{item.username.substring(0,14)}</h5>
            <p>Hi Guys, Wassup!</p>
        </div>
        </div>
        <Button className='button' variant="contained">+</Button>
   </div>
    ))}
    {/* more user */}
   </div>

</div>
   </>
  )
}

export default UserList