const express = require('express')
const authRouter = express.Router()
const User = require('../models/issue')
const jwt = require('jsonwebtoken')
// Sign-up
authRouter.post("/signup", (req, res, next) => {
  User.findOne({ username: req.body.username.toLowerCase() }, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    }
    if(user){
      res.status(403)
      return next(new Error('Bummer, this username is taken'))
    }
    const newUser = new User(req.body)
    newUser.save((err, savedUser) => {
      if(err){
        res.status(500)
        return next(err)
      }
      const token = jwt.sign(savedUser.toObject(), process.env.SECRET)
      return res.status(201).send({ token, user: savedUser })
    })
  })
})
// Login
authRouter.post("/login", (req, res, next) => {
  User.findOne({ username: req.body.username }, (err, user) => {
    if(err){
      res.status(500)
      return next(err)
    }
    if(!user || req.body.password !== user.password){
      // console.log(req.body.password, user)
      res.status(403)
      return next(new Error('Incorrect Password'))
    }
    const token = jwt.sign(user.toObject(), process.env.SECRET)
    return res.status(200).send({ token, user })
  })
})
module.exports = authRouter
