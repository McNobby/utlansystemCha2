const mongoose = require('mongoose')
const { Schema } = mongoose

const utlantSchema = new Schema({
    _id: String,
    user: String,
    info: String,
    item: String,
    timeUtlant: String, 
})
module.exports = mongoose.model('utlantSchema', utlantSchema)