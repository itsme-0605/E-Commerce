// import { UserLOGIN_Request,UserLOGIN_fail,UserLOGIN_success, Clear_errors } from "../Redux_Constants/UserConstants";

import {  UPDATE_PROFILE_Request, UPDATE_PROFILE_Reset, UPDATE_PROFILE_success, UPDATE_PROFILE_fail,LOGOUT_fail,LOGOUT_success, LoadUser_Request,LoadUser_fail,LoadUser_success,UserLOGIN_Request,UserLOGIN_fail,UserLOGIN_success, Clear_errors ,UserREGISTER_Request,UserREGISTER_fail,UserREGISTER_success} from "../Redux_Constants/UserConstants";


import {UPDATE_Password_Request,
    UPDATE_Password_success,
    UPDATE_Password_fail,
    UPDATE_Password_Reset,
    FORGET_Password_Request,
    FORGET_Password_success,
    FORGET_Password_fail,
    RESET_Password_Request,
    RESET_Password_success,
    RESET_Password_fail} from "../Redux_Constants/UserConstants";



export const userReducer = (state={Users:{}},action)=>{

    switch(action.type)
    {
        case UserLOGIN_Request:
        case UserREGISTER_Request:
        case LoadUser_Request:
            return{
                loading:true,
                isAuthenticated:false

            };
        case LOGOUT_success:
            return{
                loading:false,
                isAuthenticated:false,
                user:null
            }
        case UserLOGIN_success:
        case UserREGISTER_success:   
        case LoadUser_success: 
            return{
                loading:false,
                isAuthenticated:true,
                user:action.payload

            };
        case LOGOUT_fail:
            return{
                ...state,
                error:action.payload
            }
        case UserLOGIN_fail:
        case UserREGISTER_fail:    
            return{
                ...state,
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload

            };
        case LoadUser_fail:
            return {
                loading:false,
                isAuthenticated:false,
                user:null,
                error:action.payload

            }
        case Clear_errors:
            return{
                ...state,
                error:null
            }
        default:
            return state
    }
}


//Update Profile Reducer
export const userUpdateProfile = (state={},action)=>{

    switch(action.type)
    {
        case UPDATE_PROFILE_Request:
        case UPDATE_Password_Request:
            return{
                
                ...state,
                loading:true,
                

            };
        case UPDATE_PROFILE_success: 
        case UPDATE_Password_success:
            return{
                ...state,
                loading:false,
                isUpdated:action.payload
            };
        case UPDATE_PROFILE_fail:
        case UPDATE_Password_fail:
            return{
                ...state,
                loading:false,
                error:action.payload

            };
        case UPDATE_PROFILE_Reset:
        case UPDATE_Password_Reset:
            return {
                ...state,
                isUpdated:false

            }
        case Clear_errors:
            return{
                ...state,
                error:null
            }
        default:
            return state
    }
}



//Forget Password Reducer
export const forgetPasswordReducer = (state={},action)=>{

    switch(action.type)
    {
        case FORGET_Password_Request:
        case  RESET_Password_Request:
            return{
                
                ...state,
                loading:true,
                error:null

            };
      
        case FORGET_Password_success:
            return{
                ...state,
                loading:false,
                message:action.payload
            };
        case RESET_Password_success:
            return{
                ...state,
                loading:false,
                success:action.payload
            };
        
        
     
        case FORGET_Password_fail:
        case RESET_Password_fail:
            return{
                ...state,
                loading:false,
                error:action.payload

            };
        case Clear_errors:
            return{
                ...state,
                error:null
            }
        default:
            return state
    }
}