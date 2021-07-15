const Quiz = require("../models/quizes");
const fetch = require('node-fetch');

module.exports = {

  createQuiz:  (req, res) => {

     fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=multiple')
     .then(res => res.json())
     .then(async (quiz) => {
      //  console.log(quiz);
        let data =await Quiz.create(quiz.results)
        res.json({
          status:'success',
          data: data
        })
     })
     .catch(err => console.log(err))
             
     
},

  getQuizByCategory: async (req, res) => {

     try {
      const quiz = await Quiz.find({category : req.body.category})
      console.log(quiz);
       res.json({
         status:'success',
         message:'Quiz list.',
         data: quiz
       })
       
     } catch (err) {
      res.status(400).json({
        message:(err && err.message) || 'Ooops! Failed to get quiz.'
      })
     }
  }
}