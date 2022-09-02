import React, { Fragment, useRef, useState ,useEffect} from 'react'
import ImageIcon from '@material-ui/icons/Image'
import FaceIcon from '@material-ui/icons/Face'
import MailOutlineIcon from '@material-ui/icons/MailOutline'
import { useAlert } from 'react-alert';

import './UserUpdate.css'


import { useDispatch, useSelector } from 'react-redux';

import {userUpdate,ClearError,LoadUser} from '../../Redux_Actions/UserAction'
import { useNavigate } from 'react-router-dom';



const UserUpdate = () => {

  const alert = useAlert();

  const Navigate = useNavigate();

  const dispatch = useDispatch();

  const AvatarRef = useRef(null);
  const updateTab = useRef(null);


  const [newUser,setUser]=useState({
    name:"",
    email:""
  })

  const UPDATE_DataChangeHandler =(e)=>{
    setUser({...newUser,[e.target.name]:[e.target.value]});

  }

  const {loading,isUpdated,error} = useSelector(state=>state.UpdateUser)

  useEffect(() => {
      
    if(error)
    {
        alert.error(error)
        dispatch(ClearError)
        setUser({
          name:"",
          email:""
        })
    }

    

}, [dispatch,error])
  
  const UPDATE_Submit =(e)=>{
    e.preventDefault();

    console.log(newUser);

    dispatch(userUpdate({name:newUser.name.toString(),email:newUser.email.toString()})); 

  
      alert.success("Updated !");
       setUser({
          name:"",
          email:""
        })
        
        dispatch(LoadUser)
        Navigate("/MyProfile")


    console.log(isUpdated)
  }


  return (
    <Fragment>

        <div className="UserUpdateContainer">
            <div className='UserUpdateBox'>
            

            <form onSubmit={UPDATE_Submit} ref={updateTab} className='UPDATE_Form'>

                    <h1>UPDATE PROFILE</h1>
                    
                    <div className='UPDATE_UserName'>
                        <FaceIcon/>
                        <input
                        type="text"
                        placeholder='New UserName'
                        required
                        name="name"
                        value={newUser.name}
                        onChange={UPDATE_DataChangeHandler}/>

                    </div>

                    <div className='UPDATE_Email'>
                        <MailOutlineIcon/>
                        <input
                        type="text"
                        placeholder='New Email'
                        required
                        name="email"
                        value={newUser.email}
                        onChange={UPDATE_DataChangeHandler}/>

                    </div>

{/* 
                    <div id="registerImage" ref={AvatarRef}>
                        <ImageIcon/>
                        <input
                        type='file'
                       name="avatar"
                        onChange={UPDATE_DataChangeHandler}
                        accept='image/*'
                        />

                    </div> */}

                    <input type="submit" value="UPDATE" className='UPDATE_Button' />
                </form>


            </div>
        </div>
           

    </Fragment>
  )
}

export default UserUpdate