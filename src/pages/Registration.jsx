import React from 'react'

import registrationImg from '../assets/registrationImg.png'

import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import { alpha, styled } from '@mui/material/styles';
import Button from '@mui/material/Button';

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
  return (
        <Grid container >
        <Grid item xs={6}>
          <div className='regBox'>
            <h1 className='heading'>Get started with easily register</h1>
            <p className='para'>Free register and you can enjoy it</p>

            <div>
            <MyInput id="outlined-basic" label="Email Address" variant="outlined" />
            </div>
            <div>
            <MyInput id="outlined-basic" label="Ful name" variant="outlined" />
            </div>
            <div>
            <MyInput type='password' id="outlined-basic" label="Password" variant="outlined" />
            </div>
            <MyButton variant="contained">Sign up</MyButton>
            <p className='paraTwo'>Already  have an account ? <span>Sign In</span></p>
           
            

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