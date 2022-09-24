const mongoose = require('mongoose');
const adminSchema = new mongoose.Schema({
    name :{
        type: String,
        required: true,
        min:6,
        max: 255
    },
    email: {
        type:String,
        required:true,
        max:255,
        min:6
    },
    password: {
        type:String,
        required: true,
        max:1204,
        min:6
    },
    date :{
        type:Date,
        default: Date.now

    },
    position: {
        type:String,
        required:true,
        max:255,
        min:6
    },
});
module.exports = mongoose.model('admin', adminSchema)