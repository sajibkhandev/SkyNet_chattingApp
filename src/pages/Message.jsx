import React, { useState } from 'react'
import Grid from '@mui/material/Grid';
import Group from '../components/Group';
import Friend from '../components/Friend';
import { BsThreeDotsVertical } from "react-icons/bs";
import userProfile1 from '../assets/userProfile1.png'
import profileAvater from '../assets/profileAvater.jpg'
import ModalImage from "react-modal-image";
import { BsSendFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { getDatabase, push, ref, set } from "firebase/database";


const Message = () => {
  let [send,setSend]=useState("")
   const db = getDatabase();

   let data=useSelector((state)=>state.sajib.value)
   let data1=useSelector((state)=>state.active.man)
  
   
   
   

   let handleSendButton=()=>{
    set(push(ref(db, 'message/' )), {
      message:send,
      id:data.uid,
      name:data.displayName
   
  }).then(()=>{
    console.log("dsal");
    setSend("")
  });
   }
    
  return (
     <Grid container spacing={2}>
      
        <Grid item xs={4}>
          <div className='heightFixed'>
          <Group/>
          <Friend/>
          </div>
        </Grid>
        
        <Grid item xs={4}>
          <div className='heightFixed'>
          <div className='chatBox'>
            {/* profile start */}
            <div className='profile'>
             <div className='profileChild'>
               <img src={userProfile1} alt="" />
              <div>
                <h4>{data1.user}</h4>
                <p>Online</p>
              </div>
             </div>
              <BsThreeDotsVertical  className='threeDotIcon'/>
              
            </div>
            {/* profile end */}
            {/* message left */}
            <div className='messageBox'>
             
               <div className='masPre'>
                <p className='masOne'>Hey There !</p>
              </div>
              <div className='masPre'>
                <p className='masOne'>Hey There !</p>
              </div>
              <div className='masPre'>
                <p className='masOne'>Hey There sdfsdfs!</p>
             </div>
             {/* message right*/}
             {/* image left*/}
             <div className='masPre'>
                <ModalImage
                small={profileAvater}
                large={profileAvater}
                alt="profileAvater"
               />
             </div> <div className='masPre'>
                <ModalImage
                small={profileAvater}
                large={profileAvater}
                alt="profileAvater"
               />
             </div>
             

             {/* image left*/}
             <div className='masTwo '>
               <div className='masPre masTwoPre'>
                <p className='masOne masTwoBg'>Hey There !</p>
              </div>
              <div className='masPre masTwoPre'>
                <p className='masOne masTwoBg'>Hey There !</p>
              </div>
              <div className='masPre masTwoPre'>
                <p className='masOne masTwoBg'>Hey There sdfsdfs!</p>
              </div>
              <div className='masPre masTwoPre'>
                <p className='masOne masTwoBg'>Hey There sdfsdfssdfsdfsfsf!</p>
              </div>
              <div className='masPre masTwoImgBg masTwoPre'>
                <ModalImage
                small={profileAvater}
                large={profileAvater}
                alt="profileAvater"
               />
              </div>
             </div>
            </div>
            {/* message right */}

            <div className='sendMag'>
              <input type="text" value={send} onChange={((e)=>setSend(e.target.value))}/>
              <div onClick={handleSendButton} className='sendButton'><BsSendFill /></div>
            </div>
            

          </div>
          </div>
        </Grid>
       
       
      </Grid>
  )
}

export default Message