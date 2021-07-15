const mongoose = require('mongoose')
const moment = require('moment')
const connection = require("../db/connection")

const quizSchema = new mongoose.Schema({
    
    category: {
        type: String,
    },
    type:{
       type:String,
    },
    difficulty:{
        type: String
    },
    question:{
        type:String
    },
    correct_answer: {
        type:String
    },
    incorrect_answers: {
        type: Array 
    }
})


module.exports  = mongoose.model('Quiz',quizSchema)

