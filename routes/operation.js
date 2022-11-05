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
        movie_name : movie.title,
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
        user_name : user.name,
        review : review,

    });
    user.reviewedMovies.push({
        movie_id: movie._id,
        movie_name : movie.title,
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

router.get('/movieRating/:id',async (req,res)=>{

    const movie = await Movies.findById(req.params.id);

    var data={
        "success":true,
        "rating": movie.rating,
        message:"",

    };
    res.send(data);

});

router.get('/movieReviews/:id',async (req,res)=>{

    const movie = await Movies.findById(req.params.id);

    var data={
        "success":true,
        "rating": movie.review,
        message:"",

    };
    res.send(data);

});

router.get('/userReviews/:id',async (req,res)=>{

    const user= await Users.findById(req.params.id);

    var userdata=[];
    for(i=0;i<user.reviewedMovies.length;i++)
    {
        userdata.push({
            movie_name: user.reviewedMovies[i].movie_name,
            review :  user.reviewedMovies[i].review
        });
    }
    var data={
        "success":true,
        "data":userdata,
        message:"",

    };

    res.send(data);

});



module.exports=router;