const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Joi = require('joi');
const {User,validate}=require('../models/user');


router.get('/',async (req,res)=>{

    const user=await User.find().sort('name');
    
    res.send(user);
});

router.post('/',async (req,res)=>{

    const {error}= validate(req.body);

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
router.put('/:id',async (req,res)=>{

    const {error}= validate(req.body);

    if(error)
    {
        res.status(400).send("Body is Invalid");
    }
    const name=req.body.name;
    const phone=req.body.phone;
    const isGold=req.body.isGold;
    let result;
    if(name!=null && phone!=null & isGold!=null)
     result= await User.findByIdAndUpdate(req.params.id,{name:name,phone:phone,isGold:isGold},{
        new:true,
     });
     else if(name!=null && phone!=null)
     result= await User.findByIdAndUpdate(req.params.id,{name:name,phone:phone},{
        new:true,
     });
     else if(name!=null)
     {
        result= await User.findByIdAndUpdate(req.params.id,{name:name},{
            new:true,
         });
     }
     else if(phone!=null)
     {
        result= await User.findByIdAndUpdate(req.params.id,{phone:phone},{
            new:true,
         });
     }
     else if(isGold!=null)
     {
        result= await User.findByIdAndUpdate(req.params.id,{isGold:isGold},{
            new:true,
         });
     }
  
    res.send(result);



});
router.delete('/:id', async (req, res) => {
    const user =await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).send('The user with the given ID was not found.');
  
    res.send(user);
  });

router.get('/:id', async (req, res) => {
    const user = await User.find({'_id':req.params.id});
    if (!user) return res.status(404).send('The user with the given ID was not found.');
    res.send(user);
  });
  
  

module.exports=router;

