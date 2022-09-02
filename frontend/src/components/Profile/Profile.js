import React,{Fragment,useRef, useState} from 'react'
import MetaData from '../Layout/MetaData'
import {Link} from 'react-router-dom'
import AccountBoxIcon from "@material-ui/icons/AccountBox"
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';

import './Profile.css'

import IronMan from '../../IronMan.jpg'

import Tilt from 'react-tilt'





const Profile = ({user}) => {

    const ProfileIcon = useRef(null)


    let options = {scale:0}

  return (
    <Fragment>
        <MetaData title={`${user.name} | Profile`}/>
        <div className='profileContainer'>
            <div>
                <h1>My Profile</h1>
                <Tilt className="Tilt" {...options} ><div  className='Tilt-inner' ><img ref={ProfileIcon} src={IronMan} alt={user.name} title={user.name}/></div></Tilt>
                <p style={{color:"rgba(0,0,0,.755",fontFamily:"Quantico"}}>Hover On Icon To Tilt <ArrowUpwardIcon style={{position:"relative",top:"5px"}}/></p>
                <Link to="/MyProfile/update">Edit Profile</Link>
            </div>

            <div>

                <div>
                    <h4>FullName</h4>
                    <p>{user.name}</p>
                </div>

                <div>
                    <h4>Email</h4>
                    <p>{user.email}</p>
                </div>

                <div>
                    <h4>Jaoined On</h4>
                    <p>{String(user.createdAt).substr(0,10)}</p>
                </div>

                <div>
                    <Link tag="a" to="/Orders">My Orders</Link>
                    <Link tag="a" to ="/password/update">Change Password</Link>
                </div>
            
            </div>

        </div>
    </Fragment>
  )
}

export default Profile