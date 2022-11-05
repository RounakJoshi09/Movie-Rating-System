const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Joi = require('joi');
const {Cast} = require('../models/casts');
const{validate} =  require('../models/casts');
const auth = require('../middleware/auth');
router.get('/', async(req, res) => {

    const cast= await Cast.find().sort('name');

    res.send(cast);
  
});


router.post('/',auth, async (req, res) => {
//    const { error } = validate(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);

    let cast= new Cast({
      'name':req.body.name,
      'birth_name':req.body.birth_name,
      'image':req.body.image,
      'description':req.body.description,
      'date_of_birth':req.body.date_of_birth,
      'videos':req.body.videos,
      'height':req.body.height,
      'contact_info':req.body.contact_info==null?{}:req.body.contact_info ,    
    })
    try {
        cast=await cast.save();
    res.send(cast);        
    } catch (error) {
        res.send(error);
    }

  
});

router.put('/:id',auth, async (req, res) => {
  
    // const {error}= validate(req.body);
    // if(error)
    // {
    //   return res.status(400).send(error.details[0].message);
    // }

    const cast=await Cast.findByIdAndUpdate(req.params.id,{
        'name':req.body.name,
        'birth_name':req.body.birth_name,
        'image':req.body.image,
        'description':req.body.description,
        'date_of_birth':req.body.date_of_birth,
        'videos':req.body.videos,
        'height':req.body.height,
        'contact_info':req.body.contact_info==null?{}:req.body.contact_info ,    
      },{
      new:true
    });

    if(!cast)
    return res.status(404).send('The genre with given ID downot exist');


    res.send(cast);


});

router.delete('/:id',auth, async (req, res) => {
  const cast =await Cast.findByIdAndDelete(req.params.id);
  if (!cast) return res.status(404).send('The cast with the given ID was not found.');

  res.send(cast);
});

router.get('/:id', async (req, res) => {
  const cast = await Cast.find({'_id':req.params.id});
  if (!cast) return res.status(404).send('The cast with the given ID was not found.');
  res.send(cast);
});

module.exports = router;