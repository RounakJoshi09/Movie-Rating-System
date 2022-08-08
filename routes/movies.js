const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Joi = require('joi');
const {Movie}= require('../models/movie');
//const {Review}= require('../models/movie');
const {validateMovie}=require('../models/movie');
const { Genre } = require('../models/genres');

router.get('/',async (req,res)=>{

    const movies=await Movie.find();
    console.log(movies);
    res.send(movies);

});
router.post('/',async (req,res)=>{

    const{error}= validateMovie(req.body);

    if(error)
    {
        res.status(400).send("Invalid Body");
    }
    const genre=await Genre.findById(req.body.genreId);
    
    if(!genre)
    res.status(400).send("Invalid Genre Id");
    
    const movie =new Movie({
        title: req.body.title,
        genre: {
            _id:genre._id,
            name:genre.name
        },
        rating:req.body.rating,
        review: req.body.review,
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
    
    const movie=await Movie.findByIdAndUpdate(req.params.id,{
        
        
        title: req.body.title,
        genre: {
            _id:genre._id,
            name:genre.name
        },
        rating:req.body.rating,
        review: req.body.review,

    },{
        new:true
    })
    res.send(movie);

});

router.delete('/:id',async (req,res)=>{

    const movie=await Movie.findByIdAndDelete(req.params.id);

    if(!movie)
    res.status(400).send("The movie with given id doesnot exist");

    res.send(movie);

});


module.exports = router;



