// middleware for sending errors as json
const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || 500;

    res.status(statusCode).json(err.message);
};

// exporting error handler middleware
export default errorHandler;
