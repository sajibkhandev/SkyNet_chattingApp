import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import userProfile1 from '../assets/userProfile1.png'
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { getDatabase, onValue, push, ref, remove, set } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { activeUsers } from '../slices/activeSlice';


const Friend = () => {
    const db = getDatabase();
    let data=useSelector((state)=>state.sajib.value)
   
    let dispatch=useDispatch()
    
    let [friend,setFriend]=useState([])
    useEffect(()=>{
         const friendRef = ref(db, 'friend/');
         onValue(friendRef, (snapshot) => {
            let arr=[]
         snapshot.forEach(item=>{
            if(data.uid==item.val().reciverId || data.uid==item.val().senderId){

                arr.push({...item.val(),id:item.key});
                
            }
        })
        setFriend(arr)
         
    });

    },[])

    let handleBlock=(item)=>{
        // console.log(item);
        if(data.uid==item.senderId){
            set(push(ref(db, 'block/')),{
                block:item.reciverName,
                blockId:item.reciverId,
                blockby:item.senderName,
                blockbyId:item.senderId

            }).then(()=>{
                remove(ref(db,'friend/'+item.id))
            })
        }else{
            set(push(ref(db, 'block/')),{
                block:item.senderName,
                blockId:item.senderId,
                blockby:item.reciverName,
                blockbyId:item.reciverId
            }).then(()=>{
                remove(ref(db,'friend/'+item.id))
            })
        }

    }
    let handleChatMassage=(item)=>{
        
        if(data.uid==item.reciverId){
            dispatch(activeUsers({
            id:item.senderId,
            user:item.senderName
         }))
         localStorage.setItem('userData',JSON.stringify({
            id:item.senderId,
            user:item.senderName
         }))

        }else{
            dispatch(activeUsers({
            id:item.reciverId,
            user:item.reciverName
         }))
          localStorage.setItem('userData',JSON.stringify({
            id:item.reciverId,
            user:item.reciverName
         }))


        }
       
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
            <h4>Friends</h4>
            <BsThreeDotsVertical />
        </div>
       <div className='scroll'>
        {/* more user */}
        {friend.map(item=>(

            <div onClick={()=>handleChatMassage(item)} className='main'>
                    <div className='pain'>
                    <img src={userProfile1} alt=""  className='userProfileCommon'/>
                    <div>
                        <h5>{item.reciverId==data.uid?item.senderName:item.reciverName}</h5>
                        <p>Hi Guys, Wassup!</p>
                    </div>
                    </div>
                    {/* <p className='time'>Today, 8:56pm</p> */}
                    <Button  className='button button2' variant="contained">Massage</Button>
            </div>
        ))}
        {/* more user */}
      
       
       </div>

    </div>
    </>
  )
}

export default Friend