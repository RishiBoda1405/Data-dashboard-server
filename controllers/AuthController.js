const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const register = (req, res, next) => {
    bcrypt.hash(req.body.password, 10, function(err, hashedPass) {
        if (err) {
            res.json({
                error: er
            })
        }

        let user = new User({
            fname: req.body.fname,
            lname: req.body.lname,
            email: req.body.email,
            password: req.body.password
        })

        User.findOne({ email: req.body.email })
            .then(getUser => {
                if (getUser) {
                    console.log("user already registered");
                    res.json({
                        message: 'User already registered',
                        statuscode: 409
                    });
                } else {
                    user.save()
                        .then(saveUser => {
                            res.json({
                                message: "User added successfully!",
                                statuscode: 200
                            })
                        })
                        .catch(error => {
                            res.json({
                                message: 'An error occurred!',
                                statuscode: 400
                            })
                        })

                }
            })
    })
}


const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    User.findOne({ $or: [{ email: username }, { email: username }] })
        .then(user => {
            if (user) {
                console.log(user)
                if (password == user.password) {

                    if (user.email == 'test@gmail.com' && user.password == 'password123') {
                        let admintoken = jwt.sign({ fname: user.fname }, 'adminToken', { expiresIn: '1h' })
                        res.json({
                            message: 'Login Succesfull!',
                            admintoken,
                            statuscode: 201,
                        })
                    } else {
                        let token = jwt.sign({ fname: user.fname }, 'verySecretValue', { expiresIn: '1h' })
                        res.json({
                            message: 'Login Succesfull!',
                            token,
                            statuscode: 200,
                        })
                    }


                } else {
                    res.json({
                        message: 'Password does not matched!',
                        statuscode: 404
                    })
                }
            } else {
                res.json({
                    message: 'No user found!',
                    statuscode: 404
                })
            }
        })
}


module.exports = {
    register,
    login
}