class ApiFeatures{
    constructor(query,queryStr){
        this.query = query //mongodb query object
        this.queryStr = queryStr // parameter in query
        // console.log("this is from class");
        // console.log(this.queryStr)
    }


    search(){
        const keyword = this.queryStr.keyword ? {
            name:{
                $regex: this.queryStr.keyword,
                $options: "i",
            },
        }:{}

        this.query = this.query.find({...keyword})
        return this
    }

    filter(){
        const queryCopy = {...this.queryStr}
        
        const removeList = ["keyword","page","limit"]

        removeList.forEach((key)=> delete queryCopy[key])

        // -------FILTER FOR PRICE ---------------

        let queryStr = JSON.stringify(queryCopy)

        queryStr = queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (key)=> `$${key}`)


        this.query = this.query.find(JSON.parse(queryStr))

        return this


    }


    pagination(resultPerPage){
        const currentPage = this.queryStr.page || 1

        const skip = resultPerPage*(currentPage-1)

        this.query = this.query.limit(resultPerPage).skip(skip)

        return this
    }
}


module.exports = ApiFeatures