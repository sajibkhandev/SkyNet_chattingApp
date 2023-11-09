import { useState } from 'react';


import registrationImg from '../assets/registrationImg.png'
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import {toast } from 'react-toastify';
import Alert from '@mui/material/Alert';



const MyInput = styled(TextField) ({
    width: '70%',
    marginBottom:"34px"
    
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
const Registration = () => {

  let [reginput,setRegInput]= useState({
    email:"",
    fullName:"",
    password:""

  })
  let [error,setError]= useState({
    emailError:"",
    fullNameError:"",
    passwordError:""

  })
  const handleInputAll=(e)=>{
    setRegInput({...reginput,[e.target.name]:e.target.value});
  
   }
   let handleSignUP=()=>{
    if(error.emailError==""){
      toast.error("Enter your Email")
    }if(error.fullNameError==""){
      toast.error("Enter Your Full Name")
    }if(error.passwordError==""){
      toast.error("Enter your Password")
    }
   
   }
   
  return (
        <Grid container >
        <Grid item xs={6}>
          <div className='regBox'>
            <h1 className='heading'>Get started with easily register</h1>
            <p className='para'>Free register and you can enjoy it</p>
            <div>
            <MyInput name="email" onChange={handleInputAll} id="outlined-basic" label="Email Address" variant="outlined" />
            
            {/* {error.emailError&&<Alert severity="error">{error.emailError}</Alert>} */}
            
            </div>
            <div>
            <MyInput name="fullName" onChange={handleInputAll} id="outlined-basic" label="Ful name" variant="outlined" />
            {/* {error.fullNameError&&<Alert severity="error">{error.fullNameError}</Alert>} */}
            </div>
            <div>
            <MyInput name="password" onChange={handleInputAll} type='password' id="outlined-basic" label="Password" variant="outlined" />
            {/* {error.passwordError&&<Alert severity="error">{error.passwordError}</Alert>} */}
            </div>
            <MyButton onClick={handleSignUP} variant="contained">Sign up</MyButton>
            <p className='paraTwo'>Already  have an account ? <Link to='/login' className='unlink'><span>Sign In</span></Link></p>
          </div>
        </Grid>
        <Grid item xs={6}>
          <div>
            <img className='regImage' src={registrationImg} alt="registrationImg" />
          </div>
        </Grid>
      </Grid>
  )
}

export default Registration