import React, { useState, createRef, useEffect } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { IoHomeOutline } from "react-icons/io5";
import { AiOutlineMessage } from "react-icons/ai";
import { IoMdNotificationsOutline } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

import { getAuth, signOut } from "firebase/auth";
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginData } from '../slices/userSlice';
import { getStorage, ref, uploadString,getDownloadURL, } from "firebase/storage";
import { updateProfile  } from "firebase/auth";
import { Dna } from 'react-loader-spinner'

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


const Sideber = () => {
    const auth = getAuth();
    const storage = getStorage();
    let navigate=useNavigate()
    let dispatch=useDispatch()
    let data=useSelector((state)=>(state.sajib.value))
    let pathname=window.location.pathname.replace("/","")
    
    

    const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true)
    setModal(true)
  };
  const handleClose = () => setOpen(false);

  const [image, setImage] = useState('');
  const [cropData, setCropData] = useState("#");
  const cropperRef = createRef();

  let [loader,setLoader]=useState(false)
  let [modal,setModal]=useState(false)
   
   

    let handleLogOut=()=>{
        signOut(auth).then(() => {
          navigate('/login')
          dispatch(loginData(null))
          localStorage.removeItem("activeUser")
          // Sign-out successful.
        })
      }
     

      const onChange = (e) => {
        e.preventDefault();
        let files;
        if (e.dataTransfer) {
          files = e.dataTransfer.files;
        } else if (e.target) {
          files = e.target.files;
        }
        const reader = new FileReader();
        reader.onload = () => {
          setImage(reader.result);
        };
        reader.readAsDataURL(files[0]);
      };
      const getCropData = () => {
        setLoader(true)
        if (typeof cropperRef.current?.cropper !== "undefined") {
          const storageRef = ref(storage, data.uid);
          uploadString(storageRef, cropperRef.current?.cropper.getCroppedCanvas().toDataURL(), 'data_url').then((snapshot) => {
            console.log('Uploaded a data_url string!',snapshot);
            getDownloadURL(storageRef).then((downloadURL) => {
              console.log('File available at', downloadURL);
              updateProfile(auth.currentUser, {
                photoURL:downloadURL
              }).then(()=>{
                dispatch(loginData({...data,photoURL:downloadURL}))
                localStorage.setItem("activeUser",JSON.stringify({...data,photoURL:downloadURL}))
                setImage("")
                setLoader(false)
                setModal(false)
              })
              
            });
          });
        }
      };

      let getDataCancel=()=>{
        setImage("")
      }

      useEffect(()=>{
        if(data==null){
          navigate("/login")
        }
      },[])
    
    
  return (
    <div className='sideber'>
        <div>
        <div onClick={handleOpen}>
        <img src={data.photoURL} alt="" className='mainProfile' />
        <h2 className='profileName'>{data.displayName.substring(0,10)}</h2>
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
            Upload Your Profile 
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {image?
             <div className="imgPreviewBox">
             <div
               className="img-preview"
               
             />
             </div>
            :
            <img src={data.photoURL} alt="" className='mainProfile' />
            }
         
        
          <input type="file" onChange={onChange}/>
          {image&&
          <Cropper
          ref={cropperRef}
          style={{ height: 400, width: "100%" }}
          zoomTo={0.5}
          initialAspectRatio={1}
          preview=".img-preview"
          src={image}
          viewMode={1}
          minCropBoxHeight={100}
          minCropBoxWidth={100}
          background={false}
          responsive={true}
          autoCropArea={1}
          checkOrientation={false} 
          guides={true}
        />}
        {image&&
        (loader?
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
        <div className="uploadButton">
        <Button onClick={getDataCancel} variant="contained">Cancel</Button>
          <Button onClick={getCropData} variant="contained">Upload</Button>
        </div>
      )}
        
        
          </Typography>
        </Box>
      </Modal>}

      
        <div className='sideIcon'>
            <Link to='/home' className={`${pathname=="home"&&"active"}`}>
            <IoHomeOutline  className='commonIcon'/>
            </Link>
            <Link to='/message' className={`${pathname=="message"&&"active"}`}>
            <AiOutlineMessage  className='commonIcon'/>
            </Link>
            <Link to='/notification' className={`${pathname=="notification"&&"active"}`}>
            <IoMdNotificationsOutline  className='commonIcon'/>
            </Link>
            <Link to='/setting' className={`${pathname=="setting"&&"active"}`}>
            <IoSettingsOutline  className='commonIcon'/>
            </Link>
        </div>
        </div>
        <IoIosLogOut onClick={handleLogOut}  className='logoutIcon'/>

    </div>
  )
}

export default Sideber