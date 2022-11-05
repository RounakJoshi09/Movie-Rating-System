const Joi = require('joi');
const { default: mongoose } = require('mongoose');
const jwt = require('jsonwebtoken');

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
    default:"",
  },
  rating:{
    type:Number,
    min:0,
    max:10,
    default:0
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
        minlength:3,
        maxlength:50,
    },
    'phone':{
        type:String,
        minlength:10,
        maxlength:13,
        default:"",
    },
    'email':{
      type:String,
      require:true,
      unique:true,
    },
    'password':{
      type:String,
      require:true,
      minlength:6,
      maxlength:1024,

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
userSchemma.methods.generateAuthToken = function(){
  const token = jwt.sign({id:this._id},'jwtPrivateKey');
  return token;
   
} ;   
const Users=mongoose.model('Users',userSchemma);

function validatePassword(pass){

 const complexityOptions = {
    min: 10,
    max: 30,
    lowerCase: 1,
    upperCase: 1,
    // numeric: 1,
    // symbol: 1,
    // requirementCount: 2,
  }
  return Joi.validate(pass, new PasswordComplexity(complexityOptions));



}
function validateUser(user) {
 
        const schema = {
          name: Joi.string().min(3).max(33).required(),
          phone:Joi.string().min(10).max(13),
          email:Joi.string().email().required(),
          password:Joi.string().required().max(50),
          date_of_birth: Joi.string(),
    
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
        