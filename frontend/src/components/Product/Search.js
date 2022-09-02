import React, { useState } from 'react'
import './Search.css'
import MetaData from '../Layout/MetaData';

//to navigate to provided link: Alternative of history.push()
import { useNavigate } from 'react-router-dom';


const Search = () => {
    const [keyword,setkeyword] = useState("");

    const Navigate = useNavigate();


    const searchSubmitHandler=(e)=>{
        e.preventDefault();
        console.log(keyword )
        
        if(keyword.trim())
        {
           Navigate(`/product/${keyword}`);
        }
        else
       Navigate('/products');
    }
  return (
    <>
       <MetaData title="Ecommerce | Search" />

       <form className='search_Box' onSubmit={searchSubmitHandler}>

        <input type="text" placeholder='Search a Product ...' onChange={(e)=>setkeyword(e.target.value)}/>

        <input type="submit" value="search"/>
        </form>
    </>
  )
}

export default Search