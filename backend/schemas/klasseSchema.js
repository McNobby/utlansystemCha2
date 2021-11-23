const mongoose = require('mongoose')
const { Schema } = mongoose

const klasseSchema = new Schema({
    _id: String,
    name: String,
    shortName: String,
    teacher: Object,
    students: Array

})
module.exports = mongoose.model('klasseSchema', klasseSchema)