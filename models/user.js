const mongoose = require('mongoose')
const moment = require('moment')
const connection = require("../db/connection")
const {encrypt} = require('../utils/encrypt')

const userSchema =new mongoose.Schema({
    name:String,
    email:String,
    password:String,
    created_at:{
        type: Date, 
        default: moment().unix()* 1000
    },
    game_score:[{
        category:String,
        score: String,
        played_date: {
            type:Date,
            default: moment().unix()* 1000
        } 

    }]

})

userSchema.pre('save',function(){
    let user = this
    user.password = encrypt(user.password)
    user.created_at =  moment().unix()* 1000
})

module.exports = mongoose.model('User',userSchema)

