import React, { useState } from 'react'

import loginImg from '../assets/loginImg.png'
import {FcGoogle} from 'react-icons/fc'

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
;
import { Link, useNavigate } from 'react-router-dom';

import Alert from '@mui/material/Alert'
import {toast } from 'react-toastify';
import { Dna } from 'react-loader-spinner'
import { getAuth, signInWithEmailAndPassword,signInWithPopup, GoogleAuthProvider } from "firebase/auth";

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
  

const Login = () => {
  const auth = getAuth();

  let navigate =useNavigate()

  
  let [loader,setLoader]=useState(false)
  
  let [email,setEmail]=useState("")
  let [password,setPasswrd]=useState("")
  let [emailError,setEmailError]=useState("")
  let [passwordError,setPasswrdError]=useState("")

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
        console.log(userCredential);
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
      
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      console.log(errorCode);
      
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
            {emailError&&<Alert className='alertOne' severity="error">{emailError}</Alert>}
            </div>
            <div className='inputOne'>
            <MyInput onChange={(e)=>setPasswrd(e.target.value)} type='password' id="outlined-basic" label="Password" variant="outlined" />
            {passwordError&&<Alert className='alertOne' severity="error">{passwordError}</Alert>}
            </div>
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