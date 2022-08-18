import express from "express";


// const router = express.Router()
const AuthController = require('../controllers/AuthController.js')

// import register from '../controllers/AuthController';

// module.exports = router

export const router = express.Router({
    strict: true
});


router.post('/register', AuthController.register)
router.post('/login', AuthController.login)