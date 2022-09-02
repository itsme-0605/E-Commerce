import React from 'react'
import playStore from "../../PlayStore.png"
import appStore from "../../AppStore.png"
import "./Footer.css"

const Footer = () => {
  return (
    <>
    <footer id="footer">

        <div className="leftFooter">

            <h4>DOWNLOAD OUR APP</h4>
            <p>Download App for Android And IOS mobile Phone</p>
            <img src={playStore} title="Playstore" alt="playStore" />
            <img src={appStore} title="Appstore" alt="appStore" />

        </div>

        <div className="midFooter">

            <h1>Ecommerce</h1>
            <p>High Quality is our first priority</p>
            <p>Copyrights 2021 &copy; - <span>Harshit Kumar</span></p>
        
        </div>

        <div className='rightFooter'>

            <h4>Follow Us</h4>
            <a href="/" target="_blank" title="Instagram">Instagram</a>
            <a href="/" target="_blank" title="Youtube">Youtube</a>
            <a href="/" target="_blank" title="FaceBook">FaceBook</a>

        </div>

    </footer>
    </>
  )
}

export default Footer