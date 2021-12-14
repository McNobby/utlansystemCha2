const mongo = require('./mongo.js')
const mongoose = require('mongoose')
const registrationSchema = require('../schemas/articleSchema')
const brukerSchema = require('../schemas/brukerSchema.js')
const utlantSchema = require('../schemas/utlantSchema.js')
const klasseSchema = require('../schemas/klasseSchema.js')

module.exports = async (object, res) => {
    if(object.type === 'deleteUser'){
        //this will delete the user permanently
        try{
            //connects to database
            await mongo().then(async mongoose =>{
                await brukerSchema.deleteOne({
                    _id: object._id
                })
                console.log(`deleted user with id ${object.navn}`);
            })
        }finally{
            mongoose.connection.close
        }
    }
}