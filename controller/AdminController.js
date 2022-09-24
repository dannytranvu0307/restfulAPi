const {registerValidation , loginValidation , coursevalidation } = require('../validationUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Admin = require('../model/Admin');
const Course = require('../model/Course');
const User = require('../model/User')

class AdminController {
    async login(req, res){
        const {error} = loginValidation(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }
    
        const admin= await Admin.findOne({ email : req.body.email })
        if(!admin){
            return res.status(404).send("email doesn't exist")
        }
        const validate = await bcrypt.compare(req.body.password , admin.password);
        if(!validate) return res.status(400).send('invalid password');
        
       //create token 
       const token = jwt.sign({_id: admin._id} , "anhvuvandeptrai");
    
       
        res.header('auth-token',token).send(token);
        
    };
      

    async register(req, res){
        const {error} = registerValidation(req.body);
    if(error){
        return res.status(400).send(error.details[0].message);
    }
    //valid exist email
    const emailExist = await Admin.findOne({ email : req.body.email })
    if(emailExist){
        return res.status(404).send("email is already exist")
    }
 
    const saltRounds = 10;
    const hash = bcrypt.hashSync(req.body.password, saltRounds);
 
    // create account
     const admin = new Admin({
         name :req.body.name,
         email:req.body.email,
         password:hash,
         position:"admin"
        
        
     });
     try{
         const saveadmin =   await admin.save();
         res.send(saveadmin);
     }catch(err){
         res.status(400).send(err);
     }
        
    };
    async delete(req, res, next){
        const adminid = req.admin._id
        Admin.findByIdAndDelete(adminid)
        .then(()=>{
            res.send("admin deleted")
        })
        .catch(next)

    }
     async showuser(req, res, next){
         User.find({})
         .then((user)=>
         res.json(user))
         .catch(next)

     };
     async showcourse(req ,res,next){
         Course.find({})
         .then((course)=>{
             res.json(course)
         })
         .catch(next)
     }


     async addcourse(req, res){
        const {error} = coursevalidation(req.body);
        if(error){
            return res.status(400).send(error.details[0].message);
        }
        const newcourse = new Course ({
            name : req.body.name,
            discription :req.body.discription,
            videoid :req.body.videoid,
            img :`https://img.youtube.com/vi/${req.body.videoid}/sddefault.jpg `
        });
        try{
            const savecourse =   await newcourse.save();
            res.send(savecourse);
        }catch(err){
            res.status(400).send(err);
        }
     }

     
      async deletecourse (req, res, next){
          const id = req.body.id ;
          Course.findByIdAndDelete(id,{})
          .then(()=>{
              res.send('deleted')
          })
          .catch(next)

      }
     
}
module.exports = new  AdminController();