const mongoose = require('mongoose')
const { Schema } = mongoose

const utlantSchema = new Schema({
    _id: String,
    user: String,
    info: String,
    item: String,
    timeUtlant: Number, 
})
module.exports = mongoose.model('utlantSchema', utlantSchema)