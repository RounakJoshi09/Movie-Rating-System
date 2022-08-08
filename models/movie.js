const Joi = require('joi');
const mongoose= require('mongoose');
const {genreSchemma}=require('./genres');
const { Genre }=require('./genres');


const movieSchemma=mongoose.Schema({

    title:{
        type:String,
        require:true,
    },
    genre:{
        type:genreSchemma,
        require:true
    },
    rating:{
        type:Number,
        min:0,
        max:10,
        
    },
    review:[{
        type:String,
    }],
});

const Movie= mongoose.model('Movie',movieSchemma);
// const Review=mongoose.model('Review',reviewSchemma);

function validateMovie(movie){
    
       
      const movieSchema= {
        title: Joi.string().required(),
        genreId:Joi.string().required(),
        rating:Joi.number().min(0).max(10),
        review:Joi.array().items(Joi.string()),
      } 

      return Joi.validate(movie,movieSchema);
}



exports.Movie=Movie;
// exports.Review=Review;
exports.validateMovie=validateMovie;