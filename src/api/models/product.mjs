// importuję mongoose
const mongoose = require('mongoose')

// tworzę schemat produktu - pola z których się składa produkt
const productSchema = mongoose.Schema({
	name: String,
	price: Number,
})
module.exports = mongoose.model('Product', productSchema)
