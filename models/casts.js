const { default: mongoose } = require('mongoose');
const Joi = require('joi');


const contactInfoSchema = mongoose.Schema({

      address:{
        type:String,
        default:"",
      },
      office_address:{
        type:String,
        default:"",
      },
      manager_contact_no:{
        type:String,
        default:"",
      }            
});
const castSchema=mongoose.Schema({

    name:{
        type:String,
        require:true,
    },
    birth_name:{
        type:String,
        default:"",
    },
    image:{
        type:String,
        default:"",
    },
    description:{
        type:String,
        minlength:5,
        maxlength:500,
    },
    date_of_birth:{
        type:String,
        require:true,
    },
    videos:[{
        type:String,
        default:"",
    }],
    height:{
        type:String,
        default:"",
    },
    contact_info:{
        type:contactInfoSchema,
        
    }

});

const Casts=mongoose.model('Casts',castSchema);



function validate(castBody){

    const contactinfoSchema={
        address: Joi.string().max(255),
        office_address: Joi.string().max(255),
        manager_contact_no: Joi.string().max(12),
    };

    const  castSchema={
            name:Joi.string().required,
            birth_name:Joi.string().optional(),
            image: Joi.string().optional(),
            description:Joi.string().optional(),
            date_of_birth:Joi.string().optional(),
            videos:Joi.array().items(Joi.string()).optional(),
            height:Joi.string().max(13).optional(),
            contact_info:Joi.object({
                address: Joi.string().max(255).optional(),
              office_address: Joi.string().max(255).optional(),
               manager_contact_no: Joi.string().max(12).optional(),
            }),
        }
        return Joi.validate(castBody,castSchema);
}
module.exports.Cast=Casts;
module.exports.validate=validate;
// async function saveCast(){

    // const cast =new Casts({
    //     name:"Sadie Sink",
    //     birth_name:"Sadie Elizabeth Sink",
    //     image:"https://www.pinkvilla.com/files/styles/gallery-preview/public/sadie_sink.jpg?itok=724Y_Nw1",
    //     description:"Sadie Elizabeth Sink is an American actress. She is known for her role as Max Mayfield in the Netflix television series Stranger Things and Ziggy Berman in the horror film trilogy Fear Street. ",
    //     date_of_birth: "12/5/1998",
    //     contact_info:{
    //         address:"London",
    //     }
    // });
//     try {

//         const res= await cast.save();
//         console.log(res);
        
//     } catch (error) {
//         console.log(error)
//     }


// }    
// saveCast();


