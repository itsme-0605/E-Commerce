import React,{Fragment, useEffect, useState} from 'react'
// import Carousel from "react-material-ui-carousel"

import "./ProductDetails.css"

import {useDispatch,useSelector} from  "react-redux"
import { ClearError, getProductDetails } from '../../Redux_Actions/ProductAction'

import MetaData from "../Layout/MetaData";
import Loader from '../Loader/Loader'

import Reactstart from "react-rating-stars-component"

import ReviewCard from './ReviewCard.js'

import {useAlert} from "react-alert"


//to fetch parameters from URL
import { useParams } from 'react-router-dom';

const ProductDetails = () => {

  const alert = useAlert();

  const dispatch = useDispatch();

  const fetchParams = useParams();


  const {productDetail,loading,error} = useSelector((state)=> state.productDetails)
  console.log("hi",error)

  const[value,setIncrement] = useState(1);

  const setQuantityDec=()=>{
    if(value>1)
    setIncrement(value-1)
  }
  const setQuantityInc=()=>{
   
    if(productDetail.stock>value)
    setIncrement(value+1)
  }




  useEffect(() => {

    if(error)
    {
      alert.error(error);
      dispatch(ClearError())
    }
   


  dispatch(getProductDetails(fetchParams.id));

  }, [dispatch])

let options = {
    edit:false,
    color:"rgba(20,20,20,0.1)",
    activeColor:"tomato",
    value:2.5,
    isHalf:true,
    size: window.innerWidth <600 ? 20:25
  }
  



  return (
    <>
        <div className='ProductDetails'>
                 
            
            {
              loading?<Loader/> :(<Fragment>
              <MetaData title="Product | Shefali Maam" />
              {
              typeof(productDetail)==="undefined" ? <h1>Please Wait</h1>:(<Fragment>
              
                <div style={{border:"3px solid green"}}>
                    

                    <div className='carousel' style={{border:"3px solid red"}}>
                    {
                     
                        
                      
                        productDetail.productImage.map((image_item,i)=>{
                          return <img style={{width:"500px"}}src={image_item.image_url} alt={`${i} SLIDE`} key={image_item.image_url}  />
                        })
    
                        
                      
                    }
    
                    </div>
                </div>
    
                  <div style={{border:"3px solid yellow"}}>
                    <div className='DetailBlock-1' style={{border:"3px solid red"}}>
    
                      <h2>{productDetail.name}</h2>
                      <p>Product #ID - {productDetail._id} </p>
                      
                    </div>
    
                     
                    <div className='DetailBlock-2' style={{border:"3px solid blue"}}>
                      <span style={{display:"none"}}>{options.value = productDetail.rating}</span>
                      <Reactstart {...options} />
                      <span>NO. OF REVIEWS - {productDetail.numberOfReviews}</span>
    
                    </div>
                     
                    <div className='DetailBlock-3' style={{border:"3px solid black"}}> 
    
                      <h1> ₹ {productDetail.price}/-</h1>
    
                      <div className='DetailBlock-3-1'>
    
                        <div className='DetailBlock-3-1-1'>
    
                          <button onClick={setQuantityDec}>-</button>
                          <input readOnly type="number" value={value}/>
                          <button onClick={setQuantityInc}>+</button>
                          {/* <input type="number" value="1"/> */}
                        </div>
    
                        <button>ADD TO CART</button>
    
                      </div>
    
                      <p>
                        <b className= {productDetail.stock<1 ?"redcolor" :'greencolor'}>
                          <span style={{color:"rgba(0,0,0,0.651)"}}>Status</span>: {productDetail.stock <1 ? "Out Of Stock !!" : "Instock"}
    
                        </b>
                      </p>
    
                    </div>
                    
                    <div className='DetailBlock-4'style={{border:"3px solid dodgerblue"}}>
    
                      Description : {productDetail.description}
                    </div>
    
                    <button className='submitReview'>SUBMIT REVIEW</button>
    
    
                </div>
              
              
              </Fragment>)}

                </Fragment>
              )
            }

        </div>
        
        <div className='reviewsHeading'>
          <h1>Reviews</h1>
          <div className='ReviewContainer'>
            {
              typeof(productDetail)==="undefined" ? <p className='noReviews'>Loading Reviews</p>:(<Fragment>
                
                {
                  productDetail.numberOfReviews==0?<p className='noReviews'>No Reviews Yet!</p>:(
 
                    <Fragment>
                      {
                         productDetail.numberOfReviews>0 && productDetail.reviews.map((item)=>{
                          return <ReviewCard ReviewSample={item} />
                       })
                      }
                    </Fragment>
                  )
                 
                }
              </Fragment>)
            }
            </div>
        </div>



    </>
  )
}

export default ProductDetails