import React,{Fragment, useState,useEffect} from 'react'
import { useSelector } from 'react-redux'

import { useDispatch } from 'react-redux'

import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import VpnKeyIcon from '@material-ui/icons/VpnKey';

import MetaData from "../Layout/MetaData"
import Loader from '../Loader/Loader';
import './UserPasswordReset.css'

import {userPasswordReset,ClearError} from "../../Redux_Actions/UserAction"
import { useAlert } from 'react-alert';
import { useNavigate, useParams } from 'react-router-dom';
import { UPDATE_Password_Reset } from '../../Redux_Constants/UserConstants';



const Forget_Reset_Password = () => {

  const dispatch = useDispatch()
  const alert = useAlert()
  const Navigate = useNavigate()
  const fetchParams = useParams()


  const {error,loading,success} = useSelector(state => state.UpdateUser)

  const [NewPassword,setNewPassword] = useState("")
  const [confirmPassword,setconfirmPassword] = useState("")

  const [visibility2,setvisibility2] = useState(false)
  const [visibility3,setvisibility3] = useState(false)

  const [state_password2,setstate_password2] = useState("password")
  const [state_password3,setstate_password3] = useState("password")

  useEffect(() => {
    
    if(error)
    {
      alert.error(error)
      dispatch(ClearError());
      setNewPassword("")
      setconfirmPassword("")


    }

    if(success)
    {
      alert.success("Password Reset SuccessFully !")
      Navigate("/login_signup")

    }
  }, [dispatch,error,success])
  




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


const ResetPasswordSubmit=(e)=>{
  e.preventDefault();

  console.log("jiii",error)
  dispatch(userPasswordReset({NewPassword,confirmPassword},fetchParams.token))
  
  alert("submitted")
  console.log("ResetPasswordSubmit")
}

  return (
    <Fragment>

      {loading?(<Loader/>):(
        <Fragment>
        <MetaData title="Reset Password"/>
        <div className='LoginSignupContainer'>

            <div className='LoginSignUpBox'>

               <h1>Reset Password</h1>
                <form onSubmit={ResetPasswordSubmit} className='ResetPasswordForm'>

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

                    <input type="submit" value="Reset" className='ResetPasswordButton' />
                </form>

              </div>

        </div>
    </Fragment>
      )}

    </Fragment>
  )
}

export default Forget_Reset_Password