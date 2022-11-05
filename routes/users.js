const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Joi = require('joi');
const {Users,validate}=require('../models/users');
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

router.get('/',async (req,res)=>{

    const user=await Users.find().sort('name');
    
    res.send(user);
});

router.post('/',async (req,res)=>{

    const {error} = validate(req.body);

    if(error)
    {
        return res.status(400).send(error.details[0].message);
    }

    

    let user = await Users.findOne({email: req.body.email});

    if(user)
    {
        res.status(400).send("User Already Registered");
    }

    user = new Users({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        password:req.body.password,
        dob:req.body.date_of_birth,
    });

    const salt = await bcrypt.genSalt(10);

    user.password = await bcrypt.hash(user.password , salt);

    user = await user.save();
    
     
     
    const token = user.generateAuthToken();
    res.header('x-auth-token',token).send(_.pick(user,['name','email','_id']));



});
router.put('/:id',async (req,res)=>{

    // const {error}= validate(req.body);

    // if(error)
    // {
    //     res.status(400).send("Body is Invalid");
    // }
    const name=req.body.name;
    const phone=req.body.phone;
    const email=req.body.email;
    let result;
    if(name!=null && phone!=null && email!=null)
     result= await Users.findByIdAndUpdate(req.params.id,{name:name,phone:phone,isGold:isGold},{
        new:true,
     });
     else if(name!=null && phone!=null)
     result= await Users.findByIdAndUpdate(req.params.id,{name:name,phone:phone},{
        new:true,
     });
     else if(name!=null)
     {
        result= await Users.findByIdAndUpdate(req.params.id,{name:name},{
            new:true,
         });
     }
     else if(phone!=null)
     {
        result= await Users.findByIdAndUpdate(req.params.id,{phone:phone},{
            new:true,
         });
     }
     else if(email!=null)
     {
        result= await Users.findByIdAndUpdate(req.params.id,{isGold:isGold},{
            new:true,
         });
     }
  
    res.send(result);



});
router.delete('/:id', async (req, res) => {
    const user =await Users.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('The user with the given ID was not found.');
  
    res.send(user);
  });

router.get('/:id', async (req, res) => {
    const user = await Users.find({'_id':req.params.id});
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.send(user);
  });
  
  

module.exports=router;

