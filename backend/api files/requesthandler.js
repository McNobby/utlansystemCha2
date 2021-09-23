const submitRegistration = require('./sendToDB')
const getShit = require('./getFromDB')

module.exports = (url, object, res) =>{
    console.log(url);
    const urlArray = url.split('/')
    urlArray.shift()
    
    console.log(object);
    const reqType = urlArray[0]

    console.log(reqType);

    if (object.type === 'get') {
        getShit(object, res)
        return
    }

    submitRegistration(object, res)

}