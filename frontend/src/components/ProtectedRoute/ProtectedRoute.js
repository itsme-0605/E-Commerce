import React, {  Fragment, useEffect } from 'react'
import { useSelector } from 'react-redux'
import {Navigate as Redirect,Route} from "react-router-dom"

const ProtectedRoute = ({component:Component , ...rest}) => {

    const {loading,isAuthenticated,user} = useSelector((state)=> state.loginUser)

  return (
    <Fragment>

        {
             
                <Route 
                {...rest}
                render={(props)=>{

                    if(!isAuthenticated)
                    return <Redirect to="/login_signup" />
                    else
                    return <Component {...props} />
                }}/>
            
        }

    </Fragment>
  )
}

export default ProtectedRoute