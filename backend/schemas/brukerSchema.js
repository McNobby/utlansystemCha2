const mongoose = require('mongoose')
const { Schema } = mongoose

const userSchema = new Schema({
    _id: String,
    navn: String,
    class: Object,
    epost: String,
    teacher: Boolean,
    utlant: Array
})
module.exports = mongoose.model('userSchema', userSchema)