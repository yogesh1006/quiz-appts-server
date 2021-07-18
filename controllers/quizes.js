const Quiz = require("../models/quizes");
const fetch = require('node-fetch');

let _self = {

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

shuffleArray : (array)=> {
  for (var i = array.length - 1; i > 0; i--) {
  
      // Generate random number
      var j = Math.floor(Math.random() * (i + 1));
                  
      var temp = array[i];
      array[i] = array[j];
      array[j] = temp;
  }
      
  return array;
},

  getQuizByCategory: async (req, res) => {

     try {
      const quiz = await Quiz.find({category : req.body.category})
      quiz.map((quizz)=>{
        quizz.incorrect_answers.push(quizz.correct_answer)
        quizz.incorrect_answers = _self.shuffleArray(quizz.incorrect_answers)
      })
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

module.exports = _self