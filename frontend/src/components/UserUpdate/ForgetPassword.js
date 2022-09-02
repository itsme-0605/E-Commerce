import React, { useState,useEffect,Fragment } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Loader/Loader'
import MetaData from '../Layout/MetaData'
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import { useAlert } from 'react-alert';
import "./ForgetPassword.css"

import {forgetPassword} from "../../Redux_Actions/UserAction"
import { ClearError } from '../../Redux_Actions/ProductAction';

const ForgetPassword = () => {

    const {error,loading,message} = useSelector(state => state.forgetPassword)

    const[email,setEmail] = useState("");

    const alert = useAlert();

    const dispatch=useDispatch();


    useEffect(() => {

        if(error)
        {
            alert.error(error);
            dispatch(ClearError())
            setEmail("")
        }
        else if(message)
        {
            alert.success(message)
            setEmail("")
        }
    
    },[error,dispatch,message])
    
 
    const forgetPasswordSubmit=(e)=>{
        e.preventDefault();

        dispatch(forgetPassword({email}))

       
       
    }

  return (
    <Fragment>

      {loading?(<Loader/>):(
        <Fragment>
        <MetaData title="Forget Password"/>
        <div className='forgetPasswordContainer'>

            <div className='forgetPasswordBox'>

               <h1>Forget Password</h1>
                <form onSubmit={forgetPasswordSubmit} className='forgetPasswordForm'>

                    <div className='Div_FPassword'>
                        <MailOutlineIcon/>
                        <input
                        type="email"
                        placeholder='Enter Your Registered Email'
                        required
                        name="Email"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                        />
            
                    </div>

                  
                    <input type="submit" value="SEND" className='forgetPasswordButton' />
                </form>

              </div>

        </div>
    </Fragment>
      )}

    </Fragment>
  )
}

export default ForgetPassword