const mongo = require('./mongo.js')
const mongoose = require('mongoose')
const registrationSchema = require('../schemas/articleSchema')
const brukerSchema = require('../schemas/brukerSchema.js')
const utlantSchema = require('../schemas/utlantSchema.js')
const klasseSchema = require('../schemas/klasseSchema.js')
const { v4: uuidv4 } = require('uuid');
const deleteFromDB = require('./deleteFromDB.js')


module.exports = async (object, res) =>{

    if(object.type.startsWith('delete')){
        deleteFromDB(object, res)
        return
    }

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
                 class: object.class,
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
    //is triggered when someone loans something
    if (object.type === 'utlanUpdate'){
        try{
            //connects to database and updates user
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

           updateItemUtlan(object)
           const utlant = object.utlant[object.utlant.length - 1]

           try{
            //connects to database
            await mongo().then(async mongoose =>{
                await utlantSchema.findOneAndUpdate({
                    _id: utlant.bCode
                },{
                    _id: utlant.bCode,
                    user: object._id,
                    info: utlant.info,
                    item: utlant.name,
                    timeUtlant: Date.now(),
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
                    utlant: {status: false, utlaner: {}}
                },{
                    upsert: true
                })
            })
           }finally{
            mongoose.connection.close
           }
           return
    }
    //save class info in db, should be used for updates and new entries(not including new students)
    if(object.type === 'updateClass'){
        
        let _id = object._id
        if(!object._id){
            _id = uuidv4()
        }
        
        try{
            //connects to database
            await mongo().then(async mongoose =>{
                await klasseSchema.findOneAndUpdate({
                    _id: _id.toString()
                },{
                    _id: _id.toString(),
                    name: object.name,
                    shortName: object.shortName,
                    teacher: object.teacher,
                },{
                    upsert: true
                })
            })
           }finally{
            mongoose.connection.close
           }
    }
    if(object.type === 'rmUser'){
        try{
            //connects to database
            await mongo().then(async mongoose =>{
                await brukerSchema.deleteOne({
                    _id: object._id
                })
            })
           }finally{
            mongoose.connection.close
           }
    }
    if(object.type === 'rmClass'){
        try{
            //connects to database
            await mongo().then(async mongoose =>{
                await klasseSchema.deleteOne({
                    _id: object._id
                })
            })
           }finally{
            mongoose.connection.close
           }
    }
    
}

const updateItemUtlan = async (object) => {
               //the newest scanned item that is to be regisered
               const utlant = object.utlant[object.utlant.length - 1]

               try{
                //connects to database and gets user
                await mongo().then(async mongoose =>{
                    const user = await brukerSchema.findOne({_id: object._id})

                    await registrationSchema.findOneAndUpdate({
                        _id: utlant.bCode
                    },{
                        utlant: {status: true, utlaner: user, time: Date.now()}
                    },{
                        upsert: true
                    })

                })
               }finally{
                mongoose.connection.close
               }return
              
}