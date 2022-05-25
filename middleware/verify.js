// importing dependencies
import asyncHandler from 'express-async-handler';

/* middleware for verifying if the user who performs
delete and update operations is owner of the item */
const verify = (model, paramName) => asyncHandler(async (req, res, next) => {
    // finding item to check
    const item = await model.findById(req.params[paramName]);

    if (!item) {
        res.status(404);
        throw new Error('Item not found');
    }

    if (item.userId.toString() !== req.user.id) {
        res.status(401);
        throw new Error('You are not authorized.');
    }

    // if everything is ok move on next middleware
    next();
});

// exporting middleware
export default verify;
