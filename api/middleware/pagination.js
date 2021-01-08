const product = require("../models/product")

function paginatedResults(model) {
    return async (req, res, next) => {
        
        const page = parseInt(req.query.page)
        const limit = parseInt(req.query.limit)
        const category = req.query.category

        const startIndex = (page - 1) * limit
        const endIndex = page * limit

        let results = {}

        if(endIndex < await model.countDocuments().exec()) {
            results.next = {
                page: page + 1,
                limit: limit
            }
        }

        if(startIndex > 0) {
            results.previous = {
                page: page - 1,
                limit: limit
            }
        }

        try {
            let output = await model.find().limit(limit).skip(startIndex).exec()
            if(category) {
                const filteredResults = output.filter(result => {
                    return result.category === category;
                })
                results.results = filteredResults;
                res.paginatedResults = results
            }else {
                results.results = output;
                res.paginatedResults = results
            }
            next()
        } catch (error) {
            res.status(500).json({message: error.message})
        }

    }
}

module.exports = paginatedResults