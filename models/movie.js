const Joi = require('joi');
const mongoose= require('mongoose');
const {genreSchemma}=require('./genres');
const { Genre }=require('./genres');
const castSchema=mongoose.Schema({

    cast_id: mongoose.Schema.Types.ObjectId,
    cast_name:{
      type:String,
    },
});
const reviewSchema=mongoose.Schema({

    user_id: mongoose.Schema.Types.ObjectId,
    user_name:{
        type:String,
    },
    review:{
      type:String,
    },
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
        default:0,
        
    },
    review:{
        type:[reviewSchema],
        default:[],
    },
    cast:{
        type:[castSchema],
        default:[],
    },
});

const Movies = mongoose.model('Movies',movieSchemma);
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



exports.Movies=Movies;
// exports.Review=Review;
exports.validateMovie=validateMovie;