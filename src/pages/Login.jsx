import React from 'react'

import loginImg from '../assets/loginImg.png'
import {FcGoogle} from 'react-icons/fc'

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

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

const Login = () => {
  return (
    <Grid container >
    <Grid item xs={6}>
    <div className='regBox'>
            <h1 className='heading'>Login to your account!</h1>
            <div className='google'>
            <FcGoogle className='googleIcon'/>
            <p className='paraGoogle'>Login with Google</p>
            </div>
            <div>
            <MyInput id="outlined-basic" label="Email Address" variant="outlined" />
            </div>
            <div>
            <MyInput type='password' id="outlined-basic" label="Password" variant="outlined" />
            </div>
            <MyButton variant="contained">Login to Continue</MyButton>
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