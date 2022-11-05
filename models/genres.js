const { default: mongoose } = require('mongoose');
const Joi = require('joi');


const genreSchemma= mongoose.Schema({
    'name':{
      type:String,
      require:true,
      minlength:5,
      maxlength:50
    }
})
const Genre=mongoose.model('Genre',genreSchemma);
function validateGenre(genre) {
    const schema = {
      name: Joi.string().min(3).required()
    };                                 
  
    return Joi.validate(genre, schema);
  }
exports.Genre=Genre;
exports.validate=validateGenre;
exports.genreSchemma=genreSchemma; 