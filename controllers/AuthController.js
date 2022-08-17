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

        user.save()
            .then(user => {
                res.json({
                    message: "User added successfully!"
                })
            })
            .catch(error => {
                res.json({
                    message: 'An error occurred!'
                })
            })

    })
}


const login = (req, res, next) => {
    var username = req.body.username
    var password = req.body.password
    User.findOne({ $or: [{ email: username }, { phone: username }] })
        .then(user => {
            if (user) {
                // console.log(user);
                if (password == user.password) {
                    let token = jwt.sign({ fname: user.fname }, 'verySecretValue', { expiresIn: '1h' })
                    res.json({
                        message: 'Login Succesfull!',
                        token
                    })
                } else {
                    res.json({
                        message: 'Password does not matched!'
                    })
                }
            } else {
                res.json({
                    message: 'No user found!'
                })
            }
        })
}


module.exports = {
    register,
    login
}