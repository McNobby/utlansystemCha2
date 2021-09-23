const mongo = require('./mongo.js')
const mongoose = require('mongoose')
const registrationSchema = require('../schemas/articleSchema')
const brukerSchema = require('../schemas/brukerSchema.js')
const utlantSchema = require('../schemas/utlantSchema.js')


module.exports = async (object, res) =>{

    res.send('sendt to db')
    //utstyr registrering
    if (object.type === 'utstyrRegistrering'){

     try{
         //connects to database
         await mongo().then(async mongoose =>{
             await registrationSchema.findOneAndUpdate({
                 _id: object.barcode
             },{
                 _id: object.barcode,
                 barcode: object.barcode,
                 item: object.item,
                 plassering: object.plassering,
                 info: object.info,
                 utlant: {status: false, utlaner: ""}
             },{
                 upsert: true
             })
         })
     }finally{
         mongoose.connection.close
        }
    return
    }//if statement ends here

    //user update and registration
    if (object.type === 'usrUpdate'){
         
        try{
         //connects to database
         await mongo().then(async mongoose =>{
             await brukerSchema.findOneAndUpdate({
                 _id: object._id
             },{
                 _id: object._id,
                 navn: object.navn,
                 tlfNum: object.tlfNum,
                 epost: object.epost,
                 teacher: object.teacher
                 
             },{
                 upsert: true
             })
         })
        }finally{
         mongoose.connection.close
        }    
        return
    }
    if (object.type === 'utlanUpdate'){
        try{
            //connects to database
            await mongo().then(async mongoose =>{
                await brukerSchema.findOneAndUpdate({
                    _id: object._id
                },{
                    utlant: object.utlant
                    
                },{
                    upsert: true
                })
            })
           }finally{
            mongoose.connection.close
           }
           const utlant = object.utlant[object.utlant.length - 1]
           try{
            //connects to database
            await mongo().then(async mongoose =>{
                await registrationSchema.findOneAndUpdate({
                    _id: utlant.bCode
                },{
                    utlant: {status: true, utlaner: object.elevNavn}
                },{
                    upsert: true
                })
            })
           }finally{
            mongoose.connection.close
           }
           try{
            //connects to database
            await mongo().then(async mongoose =>{
                await utlantSchema.findOneAndUpdate({
                    _id: utlant.bCode
                },{
                    _id: utlant.bCode,
                    user: object._id,
                    info: utlant.info,
                    item: utlant.name
                    
                },{
                    upsert: true
                })
            })
           }finally{
            mongoose.connection.close
           }
           return
    }
    if(object.type === 'rmUtlan'){
        try{
            //connects to database
            await mongo().then(async mongoose =>{
                await utlantSchema.deleteOne({
                    _id: object.bCode
                })
            })
           }finally{
            mongoose.connection.close
           }

           try{
            //connects to database
            await mongo().then(async mongoose =>{
                await brukerSchema.findOneAndUpdate({
                    _id: object.userID
                },{
                    utlant: object.nyUtlant
                    
                },{
                    upsert: true
                })
            })
           }finally{
            mongoose.connection.close
           }
           try{
            //connects to database
            await mongo().then(async mongoose =>{
                await registrationSchema.findOneAndUpdate({
                    _id: object.bCode
                },{
                    utlant: {status: false, utlaner: ''}
                },{
                    upsert: true
                })
            })
           }finally{
            mongoose.connection.close
           }
           return
    }
}