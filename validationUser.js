const Joi = require('joi');


const registerValidation = (data)=>{
    const schema = Joi.object({
        name : Joi.string()
               .min(6)
               .required(),
        email : Joi.string()
               .required()
               .email(), 
    
        password : Joi.string()
               .min(6)
               .required(),
    
       
        
    })
   return schema.validate(data);
};
const loginValidation = (data)=>{
    const schema = Joi.object({
        email : Joi.string()
               .required()
               .email(), 
    
        password : Joi.string()
               .min(6)
               .required(),
    
       
        
    })
   return schema.validate(data);
};
const coursevalidation = (data)=>{
       const schema = Joi.object({
           name : Joi.string()
                  .min(6)
                  .required(),
           discription :Joi.string()
           .min(6)
           .required(),
           videoid:Joi.string()
             .required(),
   
           
       })
      return schema.validate(data);
   };
module.exports = {registerValidation, loginValidation, coursevalidation};