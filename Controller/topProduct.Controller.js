const eventEmitter = require('../utils/eventEmitter');
const Product = require('../model/product.model');
const httpStutsText = require("../utils/httpStatusText");

const topProduct =async (req, res, next) => {
    try {
        const top = await Product.find().sort({ LikedBy: -1 }).limit(3);
    res.status(200).json({ status: httpStutsText.SUCCESS, data: { top } });
    } catch (error) {
        console.log("catched");
    }
};


eventEmitter.on('productChanged', () => {
    topProduct();
});

module.exports = {topProduct};
