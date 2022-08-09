const express = require('express');
const router = express.Router();
const { Users } = require('../models/users');
const { Movies } = require('../models/movie');
const mongoose = require('mongoose');
//const Fawn  = require('fawn');

//Fawn.init("mongodb://localhost:27017/movie_rating_system");
router.post('/rate',async (req,res)=>{

    let user = await Users.findById(req.body.user_id);
    
    let movie = await Movies.findById(req.body.movie_id);

    const rating= req.body.rating; 
  
    if(movie.rating==0)
    movie.rating=rating;
    else
    movie.rating=((movie.rating+rating)/2).toPrecision(2);

    user.ratedMovies.push({
        movie_id: movie._id,
        movie_name : movie.modelName,
        rating: movie.rating, 
    });
    try {
        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
          movie = await movie.save();
          user = await user.save();
          res.send(movie);
        });
  
        session.endSession();
        console.log('success');
      } catch (error) {
        console.log('error111', error.message);
      }
    
    


});

router.post('/review',async (req,res)=>{

    let user = await Users.findById(req.body.user_id);
    
    let movie = await Movies.findById(req.body.movie_id);

    const review= req.body.review; 
  
    movie.review.push({
        user_id : req.body.user_id,
        user_name : user.modelName,
        review : review,

    });
    user.reviewedMovies.push({
        movie_id: movie._id,
        movie_name : movie.modelName,
        review: review, 
    });
    try {
        const session = await mongoose.startSession();
        await session.withTransaction(async () => {
          movie = await movie.save();
          user = await user.save();
          res.send({movie:movie,user:user});
        });
  
        session.endSession();
        console.log('success');
      } catch (error) {
        console.log('error111', error.message);
      }
    
    


});



module.exports=router;