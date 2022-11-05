const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Joi = require('joi');
const {Movies}= require('../models/movie');
//const {Review}= require('../models/movie');
const {validateMovie}=require('../models/movie');
const { Genre } = require('../models/genres');
const { Cast } = require('../models/casts');
const auth = require('../middleware/auth');
router.get('/',async (req,res)=>{

    const movies=await Movies.find();
    console.log(movies);
    res.send(movies);

});

router.post('/',auth,async (req,res)=>{

    //const{error}= validateMovie(req.body);

    // if(error)
    // {
    //     res.status(400).send("Invalid Body");
    // }
    const genre=await Genre.findById(req.body.genreId);
    let castArray=[];
   // console.log(req);
   for(i=0;i<req.body.castId.length;i++)
   {
          const cast=await Cast.findById(req.body.castId[i]);
        //console.log(cast);
            castArray.push({
                cast_id:cast._id,
                cast_name:cast.name,

            });
        
   }
    if(!genre)
    res.status(400).send("Invalid Genre Id");
    
    const movie =new Movies({
        title: req.body.title,
        genre: {
            _id:genre._id,
            name:genre.name
        },
        cast:castArray,

    })
    const result= await movie.save();

    res.send(result);

});

router.put('/:id',async (req,res)=>{
    const{error}= validateMovie(req.body);

    if(error)
    {
        res.status(400).send("Invalid Body");
    }
    const genre=await Genre.findById(req.body.genreId);
    
    if(!genre)
    res.status(400).send("Invalid Genre Id");
    
    const movie=await Movies.findByIdAndUpdate(req.params.id,{
        
        
        title: req.body.title,
        genre: {
            _id:genre._id,
            name:genre.name
        },
     

    },{
        new:true
    })
    res.send(movie);

});

router.delete('/:id',async (req,res)=>{

    const movie=await Movies.findByIdAndDelete(req.params.id);

    if(!movie)
    res.status(400).send("The movie with given id doesnot exist");

    res.send(movie);

});


module.exports = router;



