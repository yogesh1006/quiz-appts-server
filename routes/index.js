const express = require('express');
const router = express.Router();
const QuizController = require('../controllers/quizes')
const UserController = require('../controllers/user')
const Validate = require('../validations') 
const isUserAuthenticated = require('../middleware/isUserAuthenticated')
router.all('/api/*', isUserAuthenticated)


// user routes
router.post("/register",Validate.validateSignup(),UserController.register);
router.post("/login",Validate.validateLogin(),UserController.login);

//quiz routes
// router.post('/createquiz',QuizController.createQuiz);
router.get("/api/get_user_data",UserController.getUserData)
router.post('/api/get_quiz_by_category',QuizController.getQuizByCategory);
router.post('/api/update_user_score',UserController.updateScore)


module.exports = router;
