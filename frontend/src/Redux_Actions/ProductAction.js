import axios from "axios"
import { All_Product_Request,Product_Details_Request,Product_Details_fail,Product_Details_success,All_Product_fail,All_Product_success ,Clear_errors} from "../Redux_Constants/ProductConstants";


export const getProduct = (keyword="",currentpage=1,price=[0,15000],Category)=>async(dispatch)=>{

    try{
        console.log("hiiiiiiiiiis")
        dispatch({
            type:All_Product_Request
        })

        console.log("ssssss")

        let link = `/api/v1/products?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}`

        if(Category)
        link=`/api/v1/products?keyword=${keyword}&page=${currentpage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${Category}`

        const {data}= await axios.get(link)
    
        // console.log(ProductsDB )
        //  console.log(ProductsDB.data)
        console.log(data)
        // console.log(ProductsDB.data.Allproducts)

       

        dispatch({
            type:All_Product_success,
            payload: data
        })

    }catch(error)
    {

       console.log("err",error)

        dispatch({
            type:All_Product_fail,
            payload: error.response.data.message,

            
        })
    }
}


export const ClearError=()=>async(dispatch)=>{

    dispatch({
        type:Clear_errors
    })
}




export const getProductDetails = (id)=> async(dispatch)=>{

console.log("Get details")

    try{

        dispatch({
            type:Product_Details_Request
        })

        console.log("ssssss_details")
        const {data}= await axios.get(`/api/v1/products/${id}`)
    
        // console.log(ProductsDB )
        //  console.log(ProductsDB.data)
        console.log(data)
        // console.log(ProductsDB.data.Allproducts)

       

        dispatch({
            type:Product_Details_success,
            payload: data.product,
        })

    }catch(error)
    {

       console.log("err",error)

        dispatch({
            type:Product_Details_fail,
            payload: error.response.data.message,

            
        })
    }
}
