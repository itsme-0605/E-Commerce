import { All_Product_Request,All_Product_fail,All_Product_success ,Clear_errors,Product_Details_Request,Product_Details_fail,Product_Details_success} from "../Redux_Constants/ProductConstants";


export const productReducer = (state={products:[]},action)=>{


    switch (action.type) {
        case All_Product_Request:
            
            return{
                loading:true,
                product:[{}],
                productsCount:0

            }

        case All_Product_fail:
        
            return{
                loading:false,
                error:action.payload
            }
        case All_Product_success:
        
            return{
                loading:false,
                product:action.payload.Allproducts,
                productsCount:action.payload.productsCount,
                ProductToShow_PerPage:action.payload.ProductToShow_PerPage,
                filterTotalCountProduct:action.payload.filterTotalCountProduct
            } 
        case Clear_errors:
    
                return{
                ...state,
                error:null
            }        
    
        default:
            return state;
    }
};

export const productDetailsReducer = (state={products:{}},action)=>{


    switch (action.type) {
        case Product_Details_Request:
            
            return{
                loading:true,
                ...state,
            }

        case Product_Details_fail:
        
            return{
                loading:false,
                error:action.payload
            }
        case Product_Details_success:
        
            return{
                loading:false,
                productDetail:action.payload
                
            } 
        case Clear_errors:
    
                return{
                ...state,
                error:null
            }        
    
        default:
            return state;
    }
};


