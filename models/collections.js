const { default: mongoose } = require('mongoose');
const Joi = require('joi');


const collectionMovieSchema=mongoose.Schema({

    movie_id:{
        type:mongoose.Schema.Types.ObjectId,
        require:true,
    },
    movie_name:{
        type:String,
        require:true,
    },
    movie_genre:{
        type:String,
        require:true,
    }

});

const collectionSchema=mongoose.Schema({

    name:{
        type:String,
        require:true,
    },
    movie:{
        type:[collectionMovieSchema],
        require:true,
    }
});

const Collections=mongoose.model('Collections',collectionSchema);

module.exports.Collections = Collections;

// function validate(castBody){

//     const contactinfoSchema={
//         address: Joi.string().max(255),
//         office_address: Joi.string().max(255),
//         manager_contact_no: Joi.string().max(12),
//     };

//     const  castSchema={
//             name:Joi.string().required,
//             birth_name:Joi.string().optional(),
//             image: Joi.string().optional(),
//             description:Joi.string().optional(),
//             date_of_birth:Joi.string().optional(),
//             videos:Joi.array().items(Joi.string()).optional(),
//             height:Joi.string().max(13).optional(),
//             contact_info:Joi.object({
//                 address: Joi.string().max(255).optional(),
//               office_address: Joi.string().max(255).optional(),
//                manager_contact_no: Joi.string().max(12).optional(),
//             }),
//         }
//         return Joi.validate(castBody,castSchema);
// }
//module.exports.Cast=Casts;
//module.exports.validate=validate;
// async function saveCollection(){

//     const collection =new Collections({
//         name:'Top 10 Bollywood',
//         movie:{
//             movie_
//         }
//     });
//     try {

//         const res= await cast.save();
//         console.log(res);
        
//     } catch (error) {
//         console.log(error)
//     }


// }    
// saveCast();


