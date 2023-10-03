const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    imgUrl:String,
    name:String,
    prince:Number
})

const productModel = mongoose.model('products', productSchema)
module.exports = productModel;