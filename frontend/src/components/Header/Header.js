import React from 'react';

import logo from "../../logo192.png"
import {BiSearch} from "react-icons/bi"
import {BsFillCartCheckFill} from "react-icons/bs"
import {AiFillProfile} from "react-icons/ai"
import './Header.css'
import { Link } from 'react-router-dom';

import {ReactNavbar} from "overlay-navbar"




const Header = () => {
  return (
    <>
    <div className="General_Icon_Bar">
      <ul>
        <Link  tag="a" title='View Profile' to='/login_signup'><li><AiFillProfile style={{fontSize:"2.0vmax"}}/></li></Link>
        <Link tag="a" title='Search Product'  to='/search'><li><BiSearch style={{fontSize:"2.0vmax"}}/></li></Link>
        <Link tag="a" title='View Cart'  to='/cart'><li><BsFillCartCheckFill style={{fontSize:"2.0vmax"}}/></li></Link>
      </ul>
    </div>
    <ReactNavbar
    burgerColor="black"
    burgerColorHover="#000000b2"
    logo={logo}
    logoWidth="20vmax"
    navColor1="white"
    logoHoverSize="10px"
    logoHoverColor="black"
    link1Text="Home"
    link2Text="Products"
    link3Text="Contact"
    link4Text="About"
    link1Url="/"
    link2Url="/products"
    link3Url="/contact"
    link4Url="/about"
    link1Family="Quantico"
    link1Size="1.2vmax"
    link1Color="rgba(35,35,35,0.8)"
    nav1justifyContent="flex-end"
    nav2justifyContent="flex-end"
    nav3justifyContent="flex-start"
    nav4justifyContent="flex-start"
    link1ColorHover="#eb4034"
    link1Margin="1vmax"
    profileIconColorHover="#eb4034"
    searchIconColorHover="#eb4034"
    cartIconColorHover="#eb4034"
    cartIconMargin = "1vmax"
    />

 
    </>
  )
}

export default Header