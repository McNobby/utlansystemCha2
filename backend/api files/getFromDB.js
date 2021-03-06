const mongo = require('./mongo.js')
const mongoose = require('mongoose')
const registrationSchema = require('../schemas/articleSchema')
const brukerSchema = require('../schemas/brukerSchema.js')
const utlantSchema = require('../schemas/utlantSchema.js')
const klasseSchema = require('../schemas/klasseSchema.js')

module.exports = async (object , res) => {

    const {getType, userID, _id} = object
    

    if (getType === 'user'){
        try{
            //connects to database
            await mongo().then(async mongoose =>{
                const result = await brukerSchema.findOne({_id: userID})
                console.log(result);

                //if there is a user found by the userID it will respond sucsess
                if (result){
                    console.log('erxists');
                    res.send(result)
                    return
                }
                //if there is nothing found
                res.send('not found')
            })
        }finally{
            mongoose.connection.close
           }
        return
    }
    
    if (getType === 'utstyr'){
        try{
            //connects to database
            await mongo().then(async mongoose =>{
                const result = await registrationSchema.find({_id: _id})
                console.log(result);

                //if there is a user found by the userID it will respond sucsess
                if (result){
                    res.send(result)
                    return
                }
                //if there is nothing found
                res.send('not found')
            })
        }finally{
            mongoose.connection.close
           }
        return
    }


    if(getType === 'utlaan'){
        try{
            //connects to database
            await mongo().then(async mongoose =>{
                const result = await utlantSchema.find({_id: _id})
                console.log(result);

                //if there is a user found by the userID it will respond sucsess
                if (result[0]){
                    res.send(result)
                    return
                }
                //if there is nothing found
                res.send('not found')
            })
        }finally{
            mongoose.connection.close
           }
        return
    }


    if(getType === 'laanut'){
        try{
            //connects to database to check if its registered
            await mongo().then(async mongoose =>{
                const result = await registrationSchema.find({_id: _id})
                console.log(result);

                //if there is a user found by the userID it will respond sucsess
                if (result[0]){
                    await mongo().then(async mongoose =>{
                        const result2 = await utlantSchema.find({_id: _id})
                        //if its not loaned out
                        if(!result2[0]){
                            res.send(result)
                            return
                        }
                        res.send('allerede l??nt ut!')
                    })
    
                    return
                }
                //if there is nothing found
                res.send('Det du skannet er ikke registrert!')
            })
        }finally{
            mongoose.connection.close
           }

        return
    }
    
    //gets a list of all registered items
    if(getType === 'allUtstyr'){
        try{
            //connects to database
            await mongo().then(async mongoose =>{
                const result = await registrationSchema.find()
                console.log('allUtstyr fetched')
                res.send(result)

            })
        }finally{
            mongoose.connection.close
           }
        return
    }

    if(getType === 'allClasses'){
        try{
            //connects to database
            await mongo().then(async mongoose =>{
                const result = await klasseSchema.find()
                console.log('all classes fetched')
                res.send(result)

            })
        }finally{
            mongoose.connection.close
           }
        return
    }
    //to get every teacher
    if (getType === 'allTeachers'){
        try{
            //connects to database
            await mongo().then(async mongoose =>{
                const result = await brukerSchema.find({teacher: true})
                res.send(result)
            })
        }finally{
            mongoose.connection.close
           }
        return
    }
    if (getType === 'allUsers'){
        try{
            //connects to database
            await mongo().then(async mongoose =>{
                const result = await brukerSchema.find({teacher: false})
                res.send(result)
            })
        }finally{
            mongoose.connection.close
           }
        return
    }

}

