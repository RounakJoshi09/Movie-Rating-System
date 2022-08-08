const Joi = require('joi');
const { default: mongoose } = require('mongoose');


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
    'isGold':{
        type:Boolean,
        require:true,
    }
    
    });
    
const User=mongoose.model('User',userSchemma);
function validateUser(user) {
        const schema = {
          name: Joi.string().min(3),
          phone:Joi.string(),
          isGold:Joi.boolean(), 
    
        };
      
        return Joi.validate(user, schema);
      }
function validateUpdateUser(user) {
const schema = {
          name: Joi.string().min(3),
          phone:Joi.string(),
          isGold:Joi.boolean(), 
    
        };
      
        return Joi.validate(user, schema);
}

exports.User=User;
exports.validate=validateUser;
        