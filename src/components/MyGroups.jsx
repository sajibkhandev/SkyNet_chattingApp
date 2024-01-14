import React, { useEffect, useState } from 'react'
import Button from '@mui/material/Button';
import userProfile1 from '../assets/userProfile1.png'
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { TextField } from '@mui/material';
import { getDatabase, ref, onValue, push, set, remove } from "firebase/database";
import { getStorage, ref as imageRef, uploadBytes,getDownloadURL } from "firebase/storage";
import { Dna } from 'react-loader-spinner'

import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const MyGroups = () => {
    const db = getDatabase();
    const storage = getStorage();
    let data =useSelector((state)=>state.sajib.value)

  let [groupName,setGroupName]=useState("")
  let [image,setImage]=useState("")
  let [group,setGroup]=useState([])
  let [loader,setLoader]=useState(false)
  let [modal,setModal]=useState(true)
  let [error,setError]=useState("")
  

  const [open, setOpen] = React.useState(false);
  const handleOpen = () =>{
    setOpen(true);
    setModal(true)
  } 
    
    
  const handleClose = () => setOpen(false);

 


  
  let handleGroupImage=(e)=>{
    let imageTake=e.target.files[0]
    setImage(imageTake);

  }
  let handleCreateGroup=()=>{
    if(!groupName){
      setError("Require!");
    }else{
      setLoader(true)
      setError("")
    const storageRef = imageRef(storage, `janina/${uuidv4()}`);
    uploadBytes(storageRef, image).then((snapshot) => {
      getDownloadURL(storageRef).then((downloadURL) => {
      set(push(ref(db, 'group/')), {
            groupName:groupName,
            coverPhoto:downloadURL,
            admin:data.displayName,
            adminId:data.uid,
    }).then(()=>{
      setGroupName("")
      setLoader(false)
      setModal(false)

    })
    });
    });

    }
    

    
  }
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
  let handleDelete=(item)=>{
    remove(ref(db,'group/'+item.id))
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
        <div className='commonHeading '>
            <h4>My Groups</h4>
            {/* <BsThreeDotsVertical /> */}
            {/* <Button className="" variant="contained">create</Button> */}
            <h4 onClick={handleOpen} className='createGroup'>Create Group</h4>

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
                    <p className='userTime'>Today, 8:56pm</p>
                    <Button onClick={()=>handleDelete(item)} className='button' variant="contained">Delete</Button>
            </div>

        ))}
            
        {/* more user */}    
       </div>

    </div>
    
   {modal&&
   <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Create a New Group
          </Typography>
          <TextField value={groupName} onChange={(e)=>setGroupName(e.target.value)}  className='groupName' id="outlined-basic" label="Group Name:" variant="outlined" />
          <span className='error'>{error}</span>
          <TextField onChange={handleGroupImage} className='groupImage' type="file" id="outlined-basic"  variant="outlined" />
          {loader?
           <button className='buttonForLoder'>
          <Dna
              visible={true}
              height="60"
              width="80"
              ariaLabel="dna-loading"
              wrapperStyle={{padding:'px 0px',
              color:'red',
              width:'100%',
              borderRadius:"86px",
              background:"wheat",
              fontSize:'20px',
              fontFamily:"Nunito",
              fontWeight:"600",
              textTransform:"capitalize",
              marginTop:"40px",
              marginLeft:"60px"
            }}
              wrapperClass="dna-wrapper"
             />
          </button>
          :
          <Button onClick={handleCreateGroup}  className='groupCreate' variant="contained">Created</Button>
          }
         
          
        </Box>
      </Modal>
   }
   
   
    
     
    </>
  )
}

export default MyGroups