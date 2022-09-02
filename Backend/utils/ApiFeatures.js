class ApiFeatures {
    constructor(query,queryStr){
        this.query=query;
        this.queryStr = queryStr
    }

    search()
    {
        const keyword = this.queryStr.keyword ? {

            name:{
                $regex:this.queryStr.keyword,  
                //regex searches all the names that consist of keyword of query as substring , rather than secific product with exact name qual to keyword
                $options:"i"
                //resposible of Case insensitive search
            }
        }:{

        }

        // console.log(keyword)

        this.query= this.query.find({...keyword})
        return this;
    }

    filter(){   //On basis of Category
        const queryCopy = {...this.queryStr};
        // console.log(queryCopy)

        //Removing Field for category
        const removefields = ['keyword','page','limit']

        // console.log(queryCopy);

        removefields.forEach(key=>delete queryCopy[key]);

        console.log(queryCopy)

        //Price_Filters

        let PriceString = JSON.stringify(queryCopy);
        PriceString = PriceString.replace(/\b(gt|lt|gte|lte)\b/g,key=>`$${key}`);

        console.log("jjiiii",PriceString);

        

        this.query = this.query.find(JSON.parse(PriceString));
        return this;
    }

    pagination(ProductPerPage){

        const CurrentPage = Number(this.queryStr.page) || 1;

        const ProductToSkipShow = ProductPerPage*(CurrentPage-1);

        this.query = this.query.limit(ProductPerPage).skip(ProductToSkipShow);

        return this;

    }
}

module.exports = ApiFeatures;