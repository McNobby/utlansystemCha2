const mongoose = require('mongoose')
const mongoPath = 'mongodb+srv://server:Fisk123@chautlan.bjtqy.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })
    return mongoose
}