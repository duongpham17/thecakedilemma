class Features {
    constructor(query, queryString) {
        this.query = query;
        this.queryString = queryString;
    }
    
    filter() {
        //filtering
        const queryObj = { ...this.queryString };
        const excludeFields = ["page", "sort", "limit", "fields"];
        excludeFields.forEach(el => delete queryObj[el]);

        //2) advanced filtering
        let queryStr = JSON.stringify(queryObj);
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            match => `$${match}`
        );
        this.query.find(JSON.parse(queryStr));
        
        return this;
    }

    sort() {
        ///3) sorting price based on query string
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        } else {
            //if user dont specify a sort field default
            this.query = this.query.sort("-createdAt");
        }
        return this;
    }

    category() {
        if (this.queryString.sort) {
            const sortBy = this.queryString.sort.split(",").join(" ");
            this.query = this.query.sort(sortBy);
        } else {
            //if user dont specify a sort field default
            this.query = this.query.sort("createdAt");
        }
        return this;
    }

    limitFields(){
        //4) limiting fields
        if (this.queryString.fields) {
            const fields = this.queryString.fields.split(",").join(" ");
            this.query = this.query.select("fields");
        } else {
            this.query = this.query.select("-__v");
        }
        return this;
    }

    pagination(){
         //5) pagination
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 10;
        const skip = (page - 1) * limit;
        this.query = this.query.skip(skip).limit(limit);
        return this;
    }

    
}

module.exports = Features