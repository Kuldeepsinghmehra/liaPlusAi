const express = require('express');
const router = express.Router();
const { register, login } =require ('../Controllers/authController')
router.post('/signup', register);
router.post('/login', login);
module.exports = router;