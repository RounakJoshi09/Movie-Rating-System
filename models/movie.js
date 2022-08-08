const Joi = require('joi');
const mongoose= require('mongoose');
const {genreSchemma}=require('./genres');
const { Genre }=require('./genres');

const reviewSchemma=mongoose.Schema({
    review:{
        type:String,
        require:true,
    }
});
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
    review:[reviewSchemma],
});

const Movie= mongoose.model('Movie',movieSchemma);
const Review=mongoose.model('Review',reviewSchemma);

function validateMovie(movie){
    
        const genreSchema={
            name:Joi.string(),
        }
        const reviewSchema={
            comment:Joi.string(),
        }
      const movieSchema= {
        title: Joi.string().required(),
        genre:,
       rating:Joi.number(),
        review:Joi.reviewSchema,
      } 

      return Joi.validate(movie,movieSchema);
}



exports.Movie=Movie;
exports.Review=Review;
exports.validateMovie=validateMovie;