const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Joi = require('joi');
const {Users,validate}=require('../models/users');


router.get('/',async (req,res)=>{

    const user=await Users.find().sort('name');
    
    res.send(user);
});

router.post('/',async (req,res)=>{

    // const {error}= validate(req.body);

    // if(error)
    // {
    //     res.status(400).send("Body is Invalid");
    // }
    let user=new Users({
        name:req.body.name,
        phone:req.body.phone,
        email:req.body.email,
        dob:req.body.date_of_birth,
        watchList:req.body.watchList,
        ratedMovies:req.body.ratedMovies,
        reviewedMovies:req.body.reviewedMovies,
        

    });

    user= await user.save();

    res.send(user);



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

