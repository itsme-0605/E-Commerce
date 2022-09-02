import React, { Fragment } from 'react'
import "./ProductDetails.css"
import ReactStar from 'react-rating-stars-component'
import ProfilePNG from "../../Generic User Icon.png"

const ReviewCard = ({ReviewSample}) => {

    let options ={
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    value:2.5,
    isHalf:true,
    size: window.innerWidth <600 ? 20:25
    }


  return (
    <Fragment>
        <div className='reviewCard'>

            <img src={ProfilePNG} title="UserDetails" alt="User1" />
            <p>{ReviewSample.name}</p>
            <span style={{display:"none"}}>{options.value = ReviewSample.rating}</span>
            <ReactStar {...options}/>
            <span>{ReviewSample.comment}</span>


        </div>
    </Fragment>
  )
}

export default ReviewCard