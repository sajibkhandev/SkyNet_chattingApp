import React from 'react'
import Grid from '@mui/material/Grid';
import Group from '../components/Group';
import Friend from '../components/Friend';
import { BsThreeDotsVertical } from "react-icons/bs";
import userProfile1 from '../assets/userProfile1.png'


const Message = () => {
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
              <img src="" alt="" />
              <div>
                <h4>Swathi </h4>
                <p>active</p>
              </div>
              <BsThreeDotsVertical  className=''/>
              
            </div>
            {/* profile end */}
            {/* message start */}
            <div className='messageBox'>
            
            </div>
            {/* message end */}
            

          </div>
          </div>
        </Grid>
       
       
      </Grid>
  )
}

export default Message