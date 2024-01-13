import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import userProfile1 from '../assets/userProfile1.png'
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useSelector } from 'react-redux';


const BlockedUsers = () => {
     const db = getDatabase();
    let data=useSelector((state)=>state.sajib.value)
    let [block,setblock]=useState([])

    useEffect(()=>{
         const blockRef = ref(db, 'block/');
         onValue(blockRef, (snapshot) => {
            let arr=[]
         snapshot.forEach(item=>{
            if(item.val().blockbyId==data.uid){
                arr.push({
                    id:item.key,
                    block:item.val().block,
                    blockId:item.val().blockId

                })
            }else if(item.val().blockId=data.uid){
                arr.push({
                    id:item.key,
                    blockby:item.val().blockby,
                    blockbyId:item.val().blockbyId

                })
            }
            
        })
        setblock(arr)
         
    });

    },[])
    let handleUnblock=(item)=>{
       set(push(ref(db, 'friend/')), {
            senderName:item.block,
            senderId:item.blockId,
            reciverName:data.displayName,
            reciverId:data.uid
    }).then(()=>{
        remove(ref(db,'block/'+item.id))
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
    <div className='box box2'>
        <div className='commonHeading'>
            <h4>Blocked Users</h4>
            <BsThreeDotsVertical />
        </div>
       <div className='scroll'>
        {/* more user */}
        {
            block.map(item=>(
                 <div className='main'>
                    <div className='pain'>
                    <img src={userProfile1} alt=""  className='userProfileCommon'/>
                    <div>
                        <h5>{item.block}</h5>
                        <h5>{item.blockby}</h5>
                        <p className='time'>Today, 8:56pm</p>
                    </div>
                    </div>
                    {!item.blockby&&
                    <Button onClick={()=>handleUnblock(item)} className='button button2' variant="contained">unblock</Button>
                    }
            </div>

            ))
        }
           
        {/* more user */}
       
      
       
       </div>

    </div>
    </>
  )
}

export default BlockedUsers