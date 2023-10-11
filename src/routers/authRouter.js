const express = require('express');
const router = express.Router();


const AuthController = require('../controllers/authController')


router
.route('/register')
.post(AuthController.createUser);



// router
// .route('/register')
// .post(AuthController.login);



module.exports = router;


