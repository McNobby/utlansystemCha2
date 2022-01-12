const mongoose = require('mongoose')
const mongoPath = 'mongodb://root:Fisk123@172.31.100.69:27017'

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    return mongoose
}