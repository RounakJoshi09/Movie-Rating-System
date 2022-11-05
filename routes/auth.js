const express = require('express');
const config = require('config');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Joi = require('joi');
const {Users}=require('../models/users');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
router.post('/',async (req,res)=>{
    
    const {error} = validate(req.body);

    if(error)
    {
        return res.status(400).send(error.details[0].message);
    }

    let user = await Users.findOne({email: req.body.email});

    if(!user)
    {
        return res.status(400).send("Invalid Email or Password");
    }

    const validatePass = bcrypt.compare(req.body.password, user.password);

    if(!validatePass)
    {
        return res.status(400).send("Invalid Email or Password");
    }
    const token = user.generateAuthToken();
    res.send(token);
});
function validate(body) {
 
    const schema = {
   
      email:Joi.string().email().required(),
      password:Joi.string().required().max(50),
     

    };
  
    return Joi.validate(body, schema);
  }
  module.exports = router