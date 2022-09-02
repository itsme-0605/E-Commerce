import React,{Fragment, useState,useEffect} from 'react'
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import MetaData from "../Layout/MetaData"
import Loader from '../Loader/Loader';
import './UserPasswordUpdate.css'

import {userPasswordUpdate,ClearError} from "../../Redux_Actions/UserAction"
import { useAlert } from 'react-alert';
import { useNavigate } from 'react-router-dom';
import { UPDATE_Password_Reset } from '../../Redux_Constants/UserConstants';


const UserPasswordUpdate = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  const Navigate = useNavigate()


  const {error,loading,isUpdated} = useSelector(state => state.UpdateUser)

  const [OldPassword,setOldPassword] = useState("")
  const [NewPassword,setNewPassword] = useState("")
  const [confirmPassword,setconfirmPassword] = useState("")

  const [visibility1,setvisibility1] = useState(false)
  const [visibility2,setvisibility2] = useState(false)
  const [visibility3,setvisibility3] = useState(false)

  const [state_password1,setstate_password1] = useState("password")
  const [state_password2,setstate_password2] = useState("password")
  const [state_password3,setstate_password3] = useState("password")


  useEffect(() => {
    
    if(error)
    {
      alert.error(error)
      dispatch(ClearError());
      setOldPassword("");
      setNewPassword("")
      setconfirmPassword("")


    }

    if(isUpdated)
    {
      alert.success("Password Updated SuccessFully !")
      Navigate("/MyProfile")
      dispatch({
        type:UPDATE_Password_Reset
      })
    }
  }, [dispatch,error,isUpdated])
  
  

  const changeVisibility1 =(e)=>{

 
        if(visibility1==false)
        {
          setstate_password1("text")
          setvisibility1(true);
        }
        else
        {
          setstate_password1("password")
          setvisibility1(false)
        }
   
    

  }

  const changeVisibility2 =(e)=>{

    if(visibility2==false)
    {
      setstate_password2("text")
      setvisibility2(true);
    }
    else
    {
      setstate_password2("password")
      setvisibility2(false)
    }



}

const changeVisibility3 =(e)=>{

  if(visibility3==false)
        {
          setstate_password3("text")
          setvisibility3(true);
        }
        else
        {
          setstate_password3("password")
          setvisibility3(false)
        }



}

  const UpdatePasswordSubmit=(e)=>{
    e.preventDefault();

    dispatch(userPasswordUpdate({OldPassword,NewPassword,confirmPassword}))
    
    alert("submitted")
    console.log("UpdatePasswordSubmit")
  }



  return (
    <Fragment>

      {loading?(<Loader/>):(
        <Fragment>
        <MetaData title="Change Password"/>
        <div className='LoginSignupContainer'>

            <div className='LoginSignUpBox'>

               <h1>Update Password</h1>
                <form onSubmit={UpdatePasswordSubmit} className='UpdatePasswordForm'>

                    <div className='Div_Password'>
                        <VpnKeyIcon/>
                        <input
                        type={state_password1}
                        placeholder='Old Password'
                        required
                        name="oldPassword"
                        value={OldPassword}
                        onChange={(e)=>setOldPassword(e.target.value)}
                        />
                        {(visibility1==0)?<VisibilityOffIcon onClick={changeVisibility1}/>:<VisibilityIcon style={{color:"dodgerblue"}} onClick={changeVisibility1}/>}
                    </div>

                    <div className='Div_Password'>
                        <LockOpenIcon/>
                        <input
                        type={state_password2}
                        placeholder='New Password'
                        required
                        name="NewPassword"
                        value={NewPassword}
                        onChange={(e)=>setNewPassword(e.target.value)}
                        />
                        {(visibility2==0)?<VisibilityOffIcon onClick={changeVisibility2}/>:<VisibilityIcon style={{color:"dodgerblue"}} onClick={changeVisibility2}/>}
                    </div>

                    <div className='Div_Password'>
                        <LockOpenIcon/>
                        <input
                        type={state_password3}
                        placeholder='Confirm Password'
                        required
                        name="ConfirmPassword"
                        value={confirmPassword}
                        onChange={(e)=>setconfirmPassword(e.target.value)}
                        />
                        {(visibility3==0)?<VisibilityOffIcon onClick={changeVisibility3}/>:<VisibilityIcon style={{color:"dodgerblue"}} onClick={changeVisibility3}/>}
                    </div>

                    <input type="submit" value="UPDATE" className='UpdatePasswordButton' />
                </form>

              </div>

        </div>
    </Fragment>
      )}

    </Fragment>
  )
}

export default UserPasswordUpdate