import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import userProfile1 from '../assets/userProfile1.png'
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { useSelector } from 'react-redux';


const FriendRequest = () => {

    const db = getDatabase();
    let [alldata,setAlldata]=useState([])
    let data =useSelector((state)=>state.sajib.value)
    
    useEffect(()=>{
        const friendRequestRef = ref(db, 'friendRequest/');
         onValue(friendRequestRef, (snapshot) => {
            let arr=[]
         snapshot.forEach(item=>{
            if(data.uid==item.val().reciverId){

                arr.push({...item.val(),id:item.key})
            }
        })
        setAlldata(arr)
         
    });

    },[])
   
    let handleAccept=(item)=>{
        set(push(ref(db, 'friend/')), {
            ...item
    }).then(()=>{
        // console.log("done");
        remove(ref(db, 'friendRequest/'+item.id))
    })

    }
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
            <h4>Friend Request</h4>
            <BsThreeDotsVertical />
        </div>
       <div className='scroll'>
        {/* more user */}
        {alldata.map(item=>(

            <div className='main'>
                    <div className='pain'>
                    <img src={userProfile1} alt=""  className='userProfileCommon'/>
                    <div>
                        <h5>{item.senderName}</h5>
                        <p>Hi Guys, Wassup!</p>
                    </div>
                    </div>
                    <Button onClick={()=>handleAccept(item)} className='button button2' variant="contained">Accept</Button>
            </div>
        ))}

        {/* more user */}
      
       </div>

    </div>
    </>
  )
}

export default FriendRequest