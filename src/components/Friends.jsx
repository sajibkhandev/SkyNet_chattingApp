import React from 'react'
import Button from '@mui/material/Button';
import userProfile1 from '../assets/userProfile1.png'
import { BsThreeDotsVertical } from "react-icons/bs";

const Friends = () => {
  return (
    <div className='box'>
        <div className='commonHeading'>
            <h4>Friends</h4>
            <BsThreeDotsVertical />
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
                    <Button className='button' variant="contained">Join</Button>
            </div>
            <div className='main'>
                    <div className='pain'>
                    <img src={userProfile1} alt=""  className='userProfileCommon'/>
                    <div>
                        <h5>Friends Reunion</h5>
                        <p>Hi Guys, Wassup!</p>
                    </div>
                    </div>
                    <Button className='button' variant="contained">Join</Button>
            </div>
            <div className='main'>
                    <div className='pain'>
                    <img src={userProfile1} alt=""  className='userProfileCommon'/>
                    <div>
                        <h5>Friends Reunion</h5>
                        <p>Hi Guys, Wassup!</p>
                    </div>
                    </div>
                    <Button className='button' variant="contained">Join</Button>
            </div>
            <div className='main'>
                    <div className='pain'>
                    <img src={userProfile1} alt=""  className='userProfileCommon'/>
                    <div>
                        <h5>Friends Reunion</h5>
                        <p>Hi Guys, Wassup!</p>
                    </div>
                    </div>
                    <Button className='button' variant="contained">Join</Button>
            </div>
            <div className='main'>
                    <div className='pain'>
                    <img src={userProfile1} alt=""  className='userProfileCommon'/>
                    <div>
                        <h5>Friends Reunion</h5>
                        <p>Hi Guys, Wassup!</p>
                    </div>
                    </div>
                    <Button className='button' variant="contained">Join</Button>
            </div>
        {/* more user */}
       </div>

    </div>
  )
}

export default Friends