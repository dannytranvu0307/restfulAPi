const router = require('express').Router();
const verifyToken = require('./verify/verifyToken')
const multer  = require('multer')
const appRoot = require('app-root-path');
const UserController = require('../controller/Usercontroller')
const path = require('path')
//name + email + password
router.post('/register',UserController.register);
//email and password
router.post('/login', UserController.login);

//update like register
router.put('/editUser', verifyToken , UserController.edit);













// middle ware to up load avatar ------------------------------------pic
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, appRoot + "/public/image/");
  },

  // By default, multer removes file extensions so let's add them back
  filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
  }
});
 const imageFilter = function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};
const upload = multer({ storage: storage, fileFilter: imageFilter });
////////////////////////////////////////////////////////////////////////////////////////
// verify by token id 
router.post('/upload-avatar-pic', verifyToken , upload.single('avatar-pic'), UserController.handleuploadfile);
router.delete('/deleteUser', verifyToken, UserController.delete);


router.patch('/comment' ,verifyToken,  UserController.comment)
router.patch('/delete-comment' ,verifyToken,  UserController.deletecmt)

module.exports = router;