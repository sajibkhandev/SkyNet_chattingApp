import React from 'react'
import Grid from '@mui/material/Grid';
import Group from '../components/Group';
import Friend from '../components/Friend';


const Message = () => {
  return (
     <Grid container spacing={2}>
      
        <Grid item xs={4}>
          <div className='heightFixed'>
          <Group/>
          <Friend/>
          </div>
        </Grid>
       
       
      </Grid>
  )
}

export default Message