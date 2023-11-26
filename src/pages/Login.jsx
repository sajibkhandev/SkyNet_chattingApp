import React, { useEffect, useState } from 'react'

import loginImg from '../assets/loginImg.png'
import {FcGoogle} from 'react-icons/fc'

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
;
import { Link, useNavigate } from 'react-router-dom';


import {toast } from 'react-toastify';
import { Dna } from 'react-loader-spinner'
import { getAuth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider,sendPasswordResetEmail  } from "firebase/auth";
import { useDispatch, useSelector } from 'react-redux';
import { loginData } from '../slices/userSlice';


const MyInput = styled(TextField) ({
    width: '70%',
    
  });
  const MyButton = styled(Button)({
    width: '70%',
    padding:'15px 0px',
    borderRadius:"86px",
    background:"#5F35F5",
    fontSize:'20px',
    fontFamily:"Nunito",
    fontWeight:"600",
    marginBottom:"35px",
    textTransform:"capitalize"
  
  });
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
  

const Login = () => {
  const auth = getAuth();
  let dispatch=useDispatch()
  let data=useSelector((state)=>(state.sajib.value))

  

  let navigate =useNavigate()

  
  let [loader,setLoader]=useState(false)
  let [loader2,setLoader2]=useState(false)
  
  let [email,setEmail]=useState("")
  let [password,setPasswrd]=useState("")
  let [emailError,setEmailError]=useState("")
  let [passwordError,setPasswrdError]=useState("")
  let [recoverEmail,setRecoverEmail]=useState("")
  let [condition,setCondition]=useState(false)

  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true)
    setCondition(true)
  };
  const handleClose = () => setOpen(false);

  let pattern=/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
   let lowerChar=/^(?=.*[a-z])/
   let upperChar=/^(?=.*[A-Z])/
   let number=/^(?=.*[0-9])/
   let specil=/^(?=.*[!@#$%^&*])/
   let minMax=/^(?=.{8,})/

   let handleSignIn=()=>{
    if(!email){
      setEmailError("Enter your email");
    }else if(!pattern.test(email)){
      setEmailError("Enter a Valid Email");
    }else if(!password){
      setPasswrdError("Enter a password");
    }else if(!lowerChar.test(password)){
      setPasswrdError("Lower Case Must");
    }else if(!upperChar.test(password)){
      setPasswrdError("Upper Case Must");
    }else if(!number.test(password)){
      setPasswrdError("Number Must");
    }else if(!specil.test(password)){
      setPasswrdError("Specil charator Must");
    }else if(!minMax.test(password)){
      setPasswrdError("min-8 max-16");
    }else{
      setEmailError("")
      setPasswrdError("")
      setLoader(true)
      signInWithEmailAndPassword(auth, email, password).then((userCredential) => {
        // console.log(userCredential);
        dispatch(loginData(userCredential.user))
        localStorage.setItem("user",JSON.stringify(userCredential.user))
        
        if(userCredential.user.emailVerified){
          setEmail("")
        setPasswrd("")
        navigate("/home")
        setLoader(false)
      }else{
        toast.error("Please verify your Email")
        setLoader(false)
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log(errorCode);
        setLoader(false)
        if(errorCode.includes("invalid")){
          toast.error("Invalid Login Credential")
        }if(errorCode.includes("too")){
          toast.error("Too many Request try it Later")
        }
      });
    }
   }
   let handleGoogleSignIn=()=>{
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider).then((result) => {
      navigate('/home')
      dispatch(loginData(result.user))
      localStorage.setItem("user",JSON.stringify(result.user))
      console.log(result.user);
      
    }).catch((error) => {
      const errorCode = error.code;
      console.log(errorCode);
      
    });

   }
   useEffect(()=>{
    if(data!=null){
      navigate('/home')
    }

   },[])

   let handleSend=()=>{
    
    setLoader2(true)
    sendPasswordResetEmail(auth,recoverEmail)
  .then(() => {
    setLoader2(false)
    setCondition(false)
    // Password reset email sent!
    // ..
  })
  .catch((error) => {
    const errorCode = error.code;
    console.log(errorCode);
    setLoader2(false)
    setCondition(false)
    
  });

   }
  return (
    <Grid container >
    <Grid item xs={6}>
    <div className='regBox'>
            <h1 className='heading'>Login to your account!</h1>
            <div onClick={handleGoogleSignIn} className='google2'>
            <FcGoogle className='googleIcon'/>
            <p className='paraGoogle'>Login with Google</p>
            </div>
            
            <div className='inputOne'>
            <MyInput onChange={(e)=>setEmail(e.target.value)} id="outlined-basic" label="Email Address" variant="outlined" />
            {emailError&&<div className='error-box'><p>{emailError}</p></div>}
            </div>

            <div className='inputOne'>
            <MyInput onChange={(e)=>setPasswrd(e.target.value)} type='password' id="outlined-basic" label="Password" variant="outlined" />

            {passwordError&&<div className='error-box'><p>{passwordError}</p></div>}
            </div>
            {/* Desigin */}
            <h3 onClick={handleOpen} className='forgetPassword'>Forget Your Password?</h3>
            {condition&&<Modal
                     open={open}
                     onClose={handleClose}
                     aria-labelledby="modal-modal-title"
                     aria-describedby="modal-modal-description"
                   >
                     <Box sx={style}>
                       <Typography className='recover' id="modal-modal-title" variant="h6" component="h2">
                       Recover Your Password
                       </Typography>
                       <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                       <div className='inputOne'>
                       <MyInput onChange={(e)=>setRecoverEmail(e.target.value)} className='recoverinput'  id="outlined-basic" label="Enter Your Email " variant="outlined" />
                       </div>
                       {loader2?
                       <button className='buttonForLoder'>
                       <Dna
                           visible={true}
                           height="50"
                           width="80"
                           ariaLabel="dna-loading"
                           wrapperStyle={{padding:'px 0px',
                           color:'red',
                           width:'50%',
                           borderRadius:"86px",
                           background:"wheat",
                           position:"absolute",
                           bottom:"25px",
                           left:"110px",
                           textTransform:"capitalize"}}
                           wrapperClass="dna-wrapper"
                          />
                       </button>
                       :
                       <Button onClick={handleSend}  className='recoverpassword' variant="contained">Send</Button>
                       }
                         
                       </Typography>
                     </Box>
             </Modal>}
            
            {/* Desigin */}
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
                 textTransform:"capitalize"}}
                 wrapperClass="dna-wrapper"
                />
             </button>
            :
            <MyButton onClick={handleSignIn} variant="contained">Login</MyButton>
            }
            
            <p className='paraTwo'>Don’t have an account ? <Link to='/' className='unlink'><span> Sign up</span></Link></p>
          </div>
    </Grid>
    <Grid item xs={6}>
      <div>
        <img className='regImage' src={loginImg} alt="loginImg" />
      </div>
    </Grid>
  </Grid>
  )
}

export default Login