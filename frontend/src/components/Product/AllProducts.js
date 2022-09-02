import React, { Fragment,useEffect, useState } from 'react'
import "./AllProducts.css"
import { useSelector , useDispatch } from 'react-redux'
import Loader from "../Loader/Loader.js"
import { ClearError , getProduct } from '../../Redux_Actions/ProductAction';
import ProductCard from './Product';
import MetaData from "../Layout/MetaData";

import {useParams} from "react-router-dom"


//inerting pagination
import Pagination from 'react-js-pagination'


//Slider for Price Filter
import Slider from '@material-ui/core/Slider';

//for Slider Font
// import Typography from '@material-ui/core/Typography'


const AllProducts = () => {

    const fetchParams = useParams();

   console.log("hiii",fetchParams.keyword)

    const dispatch = useDispatch();


    const {loading,error, product,productsCount,ProductToShow_PerPage,filterTotalCountProduct} = useSelector((state)=>state.products)



    const [currentpage,setCurrentPage] = useState(1);

    //State for Price Change

    const[price,setPrice] = useState([0,15000]);

    const PriceHandler=(event,newPrice)=>{
        setPrice(newPrice)
        
    }


    const setCurrentPageNo=(e)=>{
        setCurrentPage(e)
    }

    // Category Filter

    const CategoryList = [
        'Beast',
        'Footwear',
        'Angel',
        'Tops',
        'Attire',
        'Camera',
        'SmartPhones'
    ];

    const [Category,SetCategory] =useState('');

    const CategoryFilterHandler=(selected)=>{
        
        console.log('category: ',Category,selected)
        SetCategory(selected)
       
       
    }


    useEffect(()=>{

        dispatch(getProduct(fetchParams.keyword,currentpage,price,Category));
      
    },[dispatch,fetchParams.keyword,currentpage,price,Category])

   let requiredLength=0;


  return (
    <Fragment>
        <MetaData title="Ecommerce | ProductStore" />
        {loading?<Loader/> :(
            <Fragment>
                
                <h2 className='productsHeading'>Products</h2>
                <div className='products-container'>
                    {
                        product && product.map((items)=>{
                            return <ProductCard  Product={items} key={items._id} />
                        })
                    }
                </div>

               <div className='FilterBox'>
                <div className='filterBox'>
                   <h1>PRICE FILTER</h1>
                   <Slider
                   value={price}
                   onChange={PriceHandler}
                   valueLabelDisplay="auto"
    
                   aria-labelledby='range-slider'
                   min={0}
                   max={15000}
                   step={500}
                   marks={[{value:0,label:"Rs 0"},
                   {value:1000,label:"Rs 1000"},
                   {value:2000,label:"Rs 2000"},
                   {value:3000,label:"Rs 3000"},
                   {value:4000,label:"Rs 4000"},
                   {value:5000,label:"Rs 5000"},
                   {value:6000,label:"Rs 6000"},
                   {value:7000,label:"Rs 7000"},
                   {value:8000,label:"Rs 8000"},
                   {value:9000,label:"Rs 9000"},
                   {value:10000,label:"Rs 10000"},
                   {value:11000,label:"Rs 11000"},
                   {value:12000,label:"Rs 12000"},
                   {value:13000,label:"Rs 13000"},
                   {value:14000,label:"Rs 14000"},
                   {value:15000,label:"Rs 15000"}]}
                   />
                </div>
                </div>

                <div className='CategoryContainer'>

                    <div className="CategoryFilter">
                        <h1>Category</h1>
                        <ul>
                            {
                                CategoryList.map((item)=>{
                                    return <li
                                    className='category-link'
                                    key={item}
                                    onClick={()=>CategoryFilterHandler(item)}
                                    >{item}</li>
                                })
                            }
                        </ul>

                    </div>

                </div>

                {
                    fetchParams.keyword==""?requiredLength=productsCount:requiredLength=filterTotalCountProduct
                }

                <div className='paginationBox'>
                    <Pagination
                    activePage={currentpage}
                    itemsCountPerPage={ProductToShow_PerPage}
                    totalItemsCount={requiredLength}
                    onChange={setCurrentPageNo}
                    nextPageText="NEXT"
                    prevPageText="PREV"
                    firstPageText="FIRST"
                    lastPageText="LAST"
                    itemClass='page-item'
                    linkClass='page-link'
                    activeClass='pageItemActive'
                    activeLinkClass='pageLinkActive'
                    />
                </div>
            </Fragment>
        )}

    </Fragment>
  )
}

export default AllProducts