const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router();
const Joi = require('joi');
const {Movie}= require('../models/movie');
const {Review}= require('../models/movie');
const {validateMovie}=require('../models/movie');
const { Genre } = require('../models/genres');

router.get('/',async (req,res)=>{

    const movies=await Movie.find();
    console.log(movies);
    res.send(movies);

});
router.post('/',async (req,res)=>{

    // const{error}= validateMovie(req.body);

    // if(error)
    // {
    //     res.status(400).send("Invalid Body");
    // }
    const movie =new Movie({
        title: req.body.title,
        genre: new Genre({
            name:req.body.genre.name,
        }),
        rating:req.body.rating,
        review: [new Review({
           review:req.body.review.comment,     
        })],
    })
    const result= await movie.save();

    res.send(result);

});

router.put('/:id',(req,res)=>{

    


});



module.exports = router;



