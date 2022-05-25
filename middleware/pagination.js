// middleware for paginating results
const paginatedResults = (model) => async (req, res, next) => {
    const page = parseInt(req.query.page, 10);
    const limit = 20;

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    const results = {};

    if (endIndex < await model.countDocuments()) {
        results.next = {
            page: page + 1,
            limit
        };
    }

    if (startIndex > 0) {
        results.previous = {
            page: page - 1,
            limit
        };
    }

    results.count = await model.countDocuments();

    try {
        results.results = await model.find().limit(limit).skip(startIndex);
        res.paginatedResults = results;
    } catch (err) {
        throw err;
    }
    next();
};

// exporting module
export default paginatedResults;
