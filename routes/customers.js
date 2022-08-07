const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Joi = require('joi');

const userSchemma= mongoose.Schema({


'name':{
    type:String,
    require:true,
},
'phone':{
    type:String,
    minlength:10,
    maxlength:10,
    require:true,
},
'isGold':{
    type:Boolean,
    require:true,
}

});

const User=mongoose.model('User',userSchemma);

router.get('/',async (req,res)=>{

    const user=await User.find().sort('name');
    
    res.send(user);
});

router.post('/',async (req,res)=>{

    const {error}= validateUser(req.body);

    if(error)
    {
        res.status(400).send("Body is Invalid");
    }
    let user=new User({
        name:req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold?req.body.isGold:false,

    });

    user= await user.save();

    res.send(user);



});


function validateUser(user) {
    const schema = {
      name: Joi.string().min(3).required(),
      phone:Joi.string(),
      isGold:Joi.boolean(), 

    };
  
    return Joi.validate(user, schema);
  }

module.exports=router;

