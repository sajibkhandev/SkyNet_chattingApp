import React from 'react'

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import GroupsList from '../components/GroupsList';
import FriendRequest from '../components/FriendRequest';
import Friends from '../components/Friends';
import MyGroups from '../components/MyGroups';
import UserList from '../components/UserList';
import BlockedUsers from '../components/BlockedUsers';

const HomePage = () => {

  return (
    <>
       <Grid container spacing={2}>
        <Grid item xs={4}>
          <div className='heightFixed'>
          <GroupsList/>
          <FriendRequest/>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className='heightFixed'>
          <Friends/>
          <MyGroups/>
          </div>
        </Grid>
        <Grid item xs={4}>
          <div className='heightFixed'>
          <UserList/>
          <BlockedUsers/>
          </div>
        </Grid>
       
      </Grid>
    </>
  )
}

export default HomePage