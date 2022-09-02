import React, { useState,Fragment,useRef ,useEffect} from 'react'
import {Link, Navigate} from 'react-router-dom'
import LockOpenIcon from '@material-ui/icons/LockOpen';
import MailOutlineIcon from '@material-ui/icons/MailOutline';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import ImageIcon from '@material-ui/icons/Image';
import FaceIcon from '@material-ui/icons/Face';
import MetaData from "../Layout/MetaData"

import './LoginSignup.css'

import { useNavigate } from 'react-router-dom';

import {useAlert} from "react-alert"

import {useDispatch,useSelector} from "react-redux"

import {ClearError,userLogin,userRegister} from "../../Redux_Actions/UserAction"


const LogInSignUp = () => {

    const dispatch = useDispatch();

    const Navigate = useNavigate();

    const {error,loading,user,isAuthenticated} =useSelector(state=>state.loginUser)

    const alert = useAlert();

    useEffect(() => {
      
        if(error)
        {
            alert.error(error)
            dispatch(ClearError)
            setLogInEmail("")
            setLogInPassword("")
        }

        if(isAuthenticated)
        Navigate('/MyProfile')

    }, [dispatch,error,isAuthenticated])
    

   const logInTab = useRef(null);
   const switcherTab = useRef(null);
   const registerTab = useRef(null);
   const AvatarRef = useRef(null);

   const switchTab=(e,tab)=>{

    if(tab==='logIn')
    {
        switcherTab.current.classList.add('shiftToLeft')
        switcherTab.current.classList.remove('shiftToRight')
        logInTab.current.classList.add('shiftToLeft')
        logInTab.current.classList.remove('shiftToRight')
        registerTab.current.classList.add('shiftToDown')
    }
    else if(tab==='signUp')
    {
        switcherTab.current.classList.add('shiftToRight')
        switcherTab.current.classList.remove('shiftToLeft')
        registerTab.current.classList.remove('shiftToDown')
        registerTab.current.classList.add('shiftToUp')
        logInTab.current.classList.add('shiftToRight')
    }

   }

    const [logInEmail,setLogInEmail] =useState('');
    const [logInPassword, setLogInPassword] = useState('')

    
    const logInSubmit=(e)=>{
        e.preventDefault();

        // console.log("dispatch",logInEmail,logInPassword)
        dispatch(userLogin(logInEmail,logInPassword))

        if(isAuthenticated)
        {
            alert.success(`Welcome ${user.name}`)
            Navigate('/MyProfile')
        }

       
    }


    // **********************************

    const [userSignUp,setUser]=useState({
        name:"",
        email:"",
        password:""
    })

    const {name,password,email} = userSignUp;

    const [avatar,setAvatar] = useState();
    const [avatarPreview,setAvatarPreview] = useState('../../Generic User Icon.png')



    const signUpSubmit=(event)=>{
        event.preventDefault();

        const myform = {
            "name":name.toString(),
            "email":email.toString(),
            "password":password.toString(),
            "avatar":avatar.toString()
        }

        console.log("signup Data : ", userSignUp)
        console.log("signup myformData : ", myform)

        dispatch(userRegister(myform))

        if(isAuthenticated)
        {
            alert.success("SignUp Successfull");
            Navigate('/account')
        }


    }


    const SignUpDataChangeHandler=(e)=>{

        if(e.target.name=='avatar')
        {
            const reader = new FileReader();

            reader.onload=()=>{
               
                if(reader.readyState==2)
                {
                   
                    AvatarRef.current.children[0].style.color="green"
                    AvatarRef.current.children[0].style.boxShadow="0 0 5px greenyellow"
                    setAvatar(reader.result)
                    setAvatarPreview(reader.result)
                }
            }

            reader.readAsDataURL(e.target.files[0])
        }
        else
        setUser({...userSignUp,[e.target.name]:[e.target.value]})
        
    }


    

// **********************************************

    // For Encrypted Password
    const [visibility,setvisibility] = useState(0);
    const [state_password,setState] = useState('password');

    const changeVisibility=(event)=>{

        if(visibility==0)
        {
            setState('text')
            setvisibility(1);

        }
        else 
        {
            setState("password")
            setvisibility(0);
            
        }


    }

  return (
    <Fragment>
        <MetaData title="Login | Signup"/>
        <div className='LoginSignupContainer'>

            <div className='LoginSignUpBox'>

                <div style={{border:"1px dotted blue"}}>
                    <div className='login-signup-toggle'>

                        <p onClick={(e)=>switchTab(e,'logIn')}>LOGIN</p>
                        <p onClick={(e)=>switchTab(e,'signUp')}>SIGNUP</p>

                    </div>
                    <button ref={switcherTab} className="LoginSignUp_Switch-Button"></button>
                </div>

                <form onSubmit={logInSubmit} ref={logInTab} className='logInForm'>
                    <div className='logInEmail'>
                        <MailOutlineIcon/>
                        <input
                        type="text"
                        placeholder='Email'
                        required
                      
                        value={logInEmail}
                        onChange={(e)=>setLogInEmail(e.target.value)}/>

                    </div>

                    <div className='logInPassword'>
                        <LockOpenIcon/>
                        <input
                        type={state_password}
                        placeholder='Password'
                        required
                        
                        value={logInPassword}
                        onChange={(e)=>setLogInPassword(e.target.value)}
                        />
                        {(visibility==0)?<VisibilityOffIcon onClick={changeVisibility}/>:<VisibilityIcon style={{color:"dodgerblue"}} onClick={changeVisibility}/>}
                    </div>

                    <Link tag="a" to="/password/forget">Forget Password ??</Link>
                    <input type="submit" value="Login" className='logInButton' />
                </form>

                <form onSubmit={signUpSubmit} ref={registerTab} className='signUpForm'>
                    
                    <div className='signUpUserName'>
                        <FaceIcon/>
                        <input
                        type="text"
                        placeholder='UserName'
                        required
                        name="name"
                        value={name}
                        onChange={SignUpDataChangeHandler}/>

                    </div>

                    <div className='signUpEmail'>
                        <MailOutlineIcon/>
                        <input
                        type="text"
                        placeholder='Email'
                        required
                        name="email"
                        value={email}
                        onChange={SignUpDataChangeHandler}/>

                    </div>

                    <div className='signUpPassword'>
                        <LockOpenIcon/>
                        <input
                        type={state_password}
                        placeholder='Password'
                        required
                        name="password"
                        value={password}
                        onChange={SignUpDataChangeHandler}
                        />
                        {(visibility==0)?<VisibilityOffIcon onClick={changeVisibility}/>:<VisibilityIcon style={{color:"dodgerblue"}} onClick={changeVisibility}/>}
                    </div>

                    <div id="registerImage" ref={AvatarRef}>
                        <ImageIcon/>
                        <input
                        type='file'
                       name="avatar"
                        onChange={SignUpDataChangeHandler}
                        accept='image/*'
                        />

                    </div>

                    <input type="submit" value="SignUp" className='signUpButton' />
                </form>

            </div>

        </div>
    </Fragment>
  )
}

export default LogInSignUp