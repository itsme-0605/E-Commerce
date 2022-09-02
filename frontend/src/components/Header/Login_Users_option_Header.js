import React, { Fragment, useState } from 'react'
import "./Header.css"

import {SpeedDial,SpeedDialAction} from '@material-ui/lab'


import DashboardIcon from '@material-ui/icons/Dashboard';
import PersonIcon from '@material-ui/icons/Person';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListAltIcon from '@material-ui/icons/ListAlt';
import AccountBoxIcon from '@material-ui/icons/AccountBox';

import { useNavigate } from 'react-router';

import { useAlert } from 'react-alert';

import { useDispatch } from 'react-redux';

import {userLogOut} from "../../Redux_Actions/UserAction"

import Backdrop from '@material-ui/core/Backdrop';


const Login_Users_option_Header = ({user}) => {
  
  const [Open,setOpen] = useState(false)

  const Navigate=useNavigate();

  const alert = useAlert();

  const dispatch=useDispatch();



  const Orders=()=>{

    Navigate("/Orders")

  }

  const Profile=()=>{

    Navigate("/MyProfile")
  }


  const logOut=()=>{

    dispatch(userLogOut())
    Navigate("/login_signup")
    alert.show('LogOut SuccessFully !')
    
  
  }


  const DashBoard=()=>{

    Navigate("/dash_board")
  }






  let actions =[
    {icon: <ListAltIcon/> ,name:"Orders",func:Orders},
    {icon: <PersonIcon/> ,name:"Profile",func:Profile},
    {icon: <ExitToAppIcon/> ,name:"logOut",func:logOut}
  ]

  if(user.userType ==='admin')
  {
    //Unshift adds the element at beginning of an array
    actions.unshift({icon: <DashboardIcon/> ,name:"DashBoard",func:DashBoard})
  }


  
  return (
    <Fragment>
      <Backdrop open={Open} style={{zIndex:10}}/>
     
      <SpeedDial 
      ariaLabel='SpeedDial tooltip example'
      onClose={()=>setOpen(false)}
      onOpen={()=>setOpen(true)}
      open={Open}
      style={{position:"fixed",right:30,bottom:20,zIndex:11}}
      icon={user.profilePic.image_url!=="imageURL"?<img src={user.profilePic.image_url} alt={`${user.name} Profile Icon`} className="SpeedDialIcon" title={`${user.name} Profile Icon`} />:<AccountBoxIcon/>}
      >
        {actions.map((action) => (
        <SpeedDialAction
      key={action.name}
      icon={action.icon}
      tooltipTitle={action.name}
      onClick={action.func}
      />
  ))}
      </SpeedDial>
        
    </Fragment>
  )
}

export default Login_Users_option_Header