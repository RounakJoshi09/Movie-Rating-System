const Joi = require('joi');
const { default: mongoose } = require('mongoose');


const watchListSchemma= mongoose.Schema({

    movie_id: {
      type:mongoose.Schema.Types.ObjectId,
      require:true,
    },
    movie_name: {
      type:String,
      require:true,
    },
    movie_image:{
      type:String,
    }

});
const ratedMovieSchema={

  movie_id: {
    type:mongoose.Schema.Types.ObjectId,
    require:true,
  },
  movie_name: {
    type:String,
    require:true,
  },
  movie_image:{
    type:String,
  },
  rating:{
    type:Number,
    min:0,
    max:10,
  }
}
const reviewedMovieSchema={

  movie_id: {
    type:mongoose.Schema.Types.ObjectId,
    require:true,
  },
  movie_name: {
    type:String,
    require:true,
  },
  movie_image:{
    type:String,
  },
  review:{
    type:String,
    maxlength:255,
    require:true,
  }
}
const userSchemma= mongoose.Schema({
'name':{
        type:String,
        require:true,
    },
    'phone':{
        type:String,
        minlength:10,
        maxlength:10,
        require:true,
    },
    'email':{
      type:String,
      require:true,
    },
    'dob':{
      type:String,
      default:"",
    },
    'watchList':{
      type:[watchListSchemma],
      default:[],
    },
    'ratedMovies':{
      type:[ratedMovieSchema],
      default:[],
    },
    'reviewedMovies':{
      type:[reviewedMovieSchema],
      default:[],
    },
    
    });
    
const Users=mongoose.model('Users',userSchemma);
function validateUser(user) {
        const schema = {
          name: Joi.string().min(3).required(),
          phone:Joi.string().min(10).max(13).required(),
          email:Joi.string().required(),
          date_of_birth: Joi.string().required(),
    
        };
      
        return Joi.validate(user, schema);
      }
// function validateUpdateUser(user) {
// const schema = {
//           name: Joi.string().min(3),
//           phone:Joi.string(),
//           isGold:Joi.boolean(), 
    
//         };
      
//         return Joi.validate(user, schema);
// }

exports.Users=Users;
exports.validate=validateUser;
        