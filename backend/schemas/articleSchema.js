const mongoose = require('mongoose')
const { Schema } = mongoose

const registrationSchema = new Schema({
    _id: String,
    barcode: String,
    item: String,
    plassering: String,
    info: String,
    utlant: Object
})
module.exports = mongoose.model('registrationSchema', registrationSchema)