const express = require('express');
const { default: mongoose, Collection } = require('mongoose');
const router = express.Router();
const Joi = require('joi');
const {Collections } = require('../models/collections');
const {Movie}= require('../models/movie');
//const{validate} =  require('../models/casts');
const auth = require('../middleware/auth');
router.get('/', async(req, res) => {

    const collections = await Collections.find().sort('name');

    res.send(collections);
  
});


router.post('/', auth,async (req, res) => {
//    const { error } = validate(req.body); 
//   if (error) return res.status(400).send(error.details[0].message);
    const movie = await Movie.findById(req.body.movie_id);
    let collection= new Collections({
      'name':req.body.name,
       'movie':[{
        'movie_id': movie._id,
        'movie_name':movie.name,
        'movie_genre':movie.genre.name,
       }],    
    })
    try {
        collection=await collection.save();
    res.send(collection);        
    } catch (error) {
        res.send(error);
    }

  
});

// router.put('/:id', async (req, res) => {
  
//     // const {error}= validate(req.body);
//     // if(error)
//     // {
//     //   return res.status(400).send(error.details[0].message);
//     // }

//     const cast=await Cast.findByIdAndUpdate(req.params.id,{
//         'name':req.body.name,
//         'birth_name':req.body.birth_name,
//         'image':req.body.image,
//         'description':req.body.description,
//         'date_of_birth':req.body.date_of_birth,
//         'videos':req.body.videos,
//         'height':req.body.height,
//         'contact_info':req.body.contact_info==null?{}:req.body.contact_info ,    
//       },{
//       new:true
//     });

//     if(!cast)
//     return res.status(404).send('The genre with given ID downot exist');


//     res.send(cast);


// });

router.delete('/:id', auth,async (req, res) => {
  const collection =await Collections.findByIdAndDelete(req.params.id);
  if (!collection) return res.status(404).send('The collection with the given ID was not found.');

  res.send(collection);
});

router.get('/:id', async (req, res) => {
  const cast = await Cast.find({'_id':req.params.id});
  if (!cast) return res.status(404).send('The cast with the given ID was not found.');
  res.send(cast);
});

module.exports = router;