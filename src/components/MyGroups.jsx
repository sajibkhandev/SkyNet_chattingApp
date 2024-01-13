import React from 'react'
import Button from '@mui/material/Button';
import userProfile1 from '../assets/userProfile1.png'
import { BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";

const MyGroups = () => {
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
            <h4 className='createGroup'>Create Group</h4>

        </div>
       <div className='scroll'>
        {/* more user */}
            <div className='main'>
                    <div className='pain'>
                    <img src={userProfile1} alt=""  className='userProfileCommon'/>
                    <div>
                        <h5>Friends Reunion</h5>
                        <p>Hi Guys, Wassup!</p>
                    </div>
                    </div>
                    <p className='userTime'>Today, 8:56pm</p>
            </div>
        {/* more user */}
        {/* more user */}
            <div className='main'>
                    <div className='pain'>
                    <img src={userProfile1} alt=""  className='userProfileCommon'/>
                    <div>
                        <h5>Friends Reunion</h5>
                        <p>Hi Guys, Wassup!</p>
                    </div>
                    </div>
                    <p className='userTime'>Today, 8:56pm</p>
            </div>
        {/* more user */}
        {/* more user */}
            <div className='main'>
                    <div className='pain'>
                    <img src={userProfile1} alt=""  className='userProfileCommon'/>
                    <div>
                        <h5>Friends Reunion</h5>
                        <p>Hi Guys, Wassup!</p>
                    </div>
                    </div>
                    <p className='userTime'>Today, 8:56pm</p>
            </div>
        {/* more user */}
        {/* more user */}
            <div className='main'>
                    <div className='pain'>
                    <img src={userProfile1} alt=""  className='userProfileCommon'/>
                    <div>
                        <h5>Friends Reunion</h5>
                        <p>Hi Guys, Wassup!</p>
                    </div>
                    </div>
                    <p className='userTime'>Today, 8:56pm</p>
            </div>
        {/* more user */}
       </div>

    </div>
    </>
  )
}

export default MyGroups