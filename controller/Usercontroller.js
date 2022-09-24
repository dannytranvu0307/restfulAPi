const User = require('../model/User');
const Course = require('../model/Course');
const {registerValidation , loginValidation} = require('../validationUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer  = require('multer')
const upload = multer().single('profile_pic');

class  UserController {


    // register controller 
    async register(req, res){
       const {error} = registerValidation(req.body);
   if(error){
       return res.status(400).send(error.details[0].message);
   }
   //valid exist email
   const emailExist = await User.findOne({ email : req.body.email })
   if(emailExist){
       return res.status(404).json({"error":"email is already exist"})
   }

   const saltRounds = 10;
   const hash = bcrypt.hashSync(req.body.password, saltRounds);

   // create account
    const user = new User({
        name :req.body.name,
        email:req.body.email,
        password:hash
    });
    try{
        const saveduser =   await user.save();
        res.json(saveduser);
    }catch(err){
        res.status(400).send(err);
    }
       
   };

   //log-in controller 
   async login(req, res){
    const {error} = loginValidation(req.body);
    
    if(error){
        console.log(error.details[0].message)
        return res.status(400).send({"error" : error.details[0].message });
    }

    const user = await User.findOne({ email : req.body.email })
            
    if(!user){
        return res.status(404).send({"error": "email doesn't exist"})
    }
    const validate = await bcrypt.compare(req.body.password , user.password);
    if(!validate) return res.status(404).json({"error": "invalid password"});
    
   //create token 
   const token = jwt.sign({_id: user._id} , "anhvudeptraivcl");
   res.header('auth-token',token).json({token:token});
};
  
  //editupdate
    async edit(req, res){
        const id = req.user._id;
    const {error} = registerValidation(req.body);
    if(error){
        return res.status(400).json({"error" : error.details[0].message });
    }
    const saltRounds = 10;
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
    req.body.password = hash;
   
   
     try{
         await User.updateOne({id}, req.body);
        res.json({"status":"successed"});
    }catch(err){
        res.status(400).send(err);
    };
    }

      
   // handle upload file

    handleuploadfile = async (req ,res)=> {
        const id = req.user._id;
        upload(req, res, function (err) {
            // req.file contains information of uploaded file
            // req.body contains information of text fields, if there were any
    
            if (req.fileValidationError) {
                return res.send(req.fileValidationError);
            }
            else if (!req.file) {
                return res.send('Please select an image to upload');

                
            }
            else if (err instanceof multer.MulterError) {
                return res.send(err);
            }
            else if (err) {
                return res.send(err);
            }
    
            // Display uploaded image for user validation
             User.findByIdAndUpdate(id, { image: `http://localhost:3001/${req.file.filename}` })
             .then(()=>{
                 res.json({ image: `http://localhost:3001/${req.file.filename}` })
             })
             .catch((err)=>{return err})
        });
      }



      async delete(req,res){
        const id = req.user._id;
        try{
            await User.deleteOne({id});
           res.send("deleted");
       }catch(err){
           res.status(400).send(err);
       };
      }





    comment(req, res, next){
        var name 
        var image
        const userid = req.user._id;
        User.findById(userid)
         .then((user)=> {
             name = user.name
             image = user.image
             const comment = {
                name,
                image,
                comment:req.body.comment
               }
    
            const _id = req.body.id;
          Course.findByIdAndUpdate(_id ,{"$push": {"comment": comment }})
            .then(()=>{  res.json( "commented")})
            .catch(next)
        })  
         .catch(next)
        
      } 

   deletecmt(req , res, next){
        var userid = req.user._id;
       
        User.findById(userid)
         .then((user)=> {
            const ten = user.name;
            const comment = req.body.comment;
            const id = req.body.id;
          Course.findByIdAndUpdate(id ,{"$pull": {"comment": {"comment": comment}}})
            .then(()=>{
              res.json("deleted-cmt")
            })
            .catch(next)
        })  
         .catch(next)




        }

 
    getUserbyToken (req, res, next){
        const id = req.user._id;
        User.findById(id)
        .then((user)=>res.send(user))
        .catch(next)
     }
}
module.exports = new  UserController();