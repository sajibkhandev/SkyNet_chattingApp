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
      reciverId:data1.id,
      
   
  }).then(()=>{
    console.log("dsal");
    setSend("")
  });

    }else{
      console.log("nai");
    }
    
   }

   useEffect(()=>{
    const messageRef = ref(db, 'message/');
         onValue(messageRef, (snapshot) => {
            let arr=[]
         snapshot.forEach(item=>{
          if((item.val().senderId==data.uid && item.val().reciverId==data1.id)||
          (item.val().reciverId==data.uid && item.val().senderId==data1.id)){
            arr.push(item.val())
          }
            
        })
        setMessage(arr)
    });


   },[])
   console.log(message);
   
    
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
            {
              message.map(item=>(
                item.reciverId==data.uid?
                <div className='masPre'>
                <p className='masOne'>{item.message}</p>
              </div>
              :
              <div className='masTwo '>
                <div className='masPre masTwoPre'>
                <p className='masOne masTwoBg'>{item.message}</p>
              </div>
              
               </div>
              ))
            }
             
               
              
             {/* message left end */}
             
             {/* image left start */}
             {/* <div className='masPre'>
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
             </div> */}
             {/* image left end */}

             <div className='masTwo '>
             {/* massage right start */}
             {/* {
              message.map(item=>(
                item.reciverId==data1.id &&
                <div className='masPre'>
                <p className='masOne'>{item.message}</p>
              </div>

              ))
            } */}
               {/* <div className='masPre masTwoPre'>
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
              </div> */}
              {/* massage right end */}

              {/* image right start */}
              
              {/* <div className='masPre masTwoImgBg masTwoPre'>
                <ModalImage
                small={profileAvater}
                large={profileAvater}
                alt="profileAvater"
               />
              </div> */}
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