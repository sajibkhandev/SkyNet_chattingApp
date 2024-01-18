import React, { useEffect, useState } from 'react'
import Grid from '@mui/material/Grid';
import Group from '../components/Group';
import Friend from '../components/Friend';
import { BsThreeDotsVertical } from "react-icons/bs";
import userProfile1 from '../assets/userProfile1.png'
import profileAvater from '../assets/profileAvater.jpg'
import ModalImage from "react-modal-image";
import { BsSendFill } from "react-icons/bs";
import { useSelector } from 'react-redux';
import { getDatabase, onValue, push, ref, set } from "firebase/database";


const Message = () => {
  const db = getDatabase();
  
  let data=useSelector((state)=>state.sajib.value)
  let data1=useSelector((state)=>state.active.man)
  
  let [message,setMessage]=useState([])
  let [send,setSend]=useState("")
  
   
   
   

   let handleSendButton=()=>{
    if(data1.status=='single'){
      
      set(push(ref(db, 'message/' )), {
      message:send,
      senderName:data.displayName,
      senderId:data.uid,
      reciverName:data1.user,
      reciverId:data.uid,
      
   
  }).then(()=>{
    console.log("dsal");
    setSend("")
  });

    }else{
      console.log("nai");
    }
    
   }

   useEffect(()=>{
    const groupRef = ref(db, 'message/');
         onValue(groupRef, (snapshot) => {
            let arr=[]
         snapshot.forEach(item=>{
          console.log(item.val());
          
            
        })
        // setMessage(arr)
    });


   },[])
   
    
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


            <div className='messageBox'>
            {/* message left start */}
             
               <div className='masPre'>
                <p className='masOne'>Hey There !</p>
              </div>
              <div className='masPre'>
                <p className='masOne'>Hey There !</p>
              </div>
              <div className='masPre'>
                <p className='masOne'>Hey There sdfsdfs!</p>
             </div>
             {/* message left end */}
             
             {/* image left start */}
             <div className='masPre'>
                <ModalImage
                small={profileAvater}
                large={profileAvater}
                alt="profileAvater"
               />
             </div> 
             <div className='masPre'>
                <ModalImage
                small={profileAvater}
                large={profileAvater}
                alt="profileAvater"
               />
             </div>
             {/* image left end */}

             <div className='masTwo '>
             {/* massage right start */}
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
              {/* massage right end */}

              {/* image right start */}
              
              <div className='masPre masTwoImgBg masTwoPre'>
                <ModalImage
                small={profileAvater}
                large={profileAvater}
                alt="profileAvater"
               />
              </div>
             </div>
            {/* image right end*/}
            </div>

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