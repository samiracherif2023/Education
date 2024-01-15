// import mongoose module
const mongoose =require ("mongoose");

var uniqueValidator = require('mongoose-unique-validator');
const userSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email:{type:String, unique: true},
    password:String,
    tel:{type:String, unique: true},
    telChild:String,
    adress:String,
    level:String,
    speciality:String,
    role:String,
    img:String,
    cv:String,
    teacherId: String,
   courseId: String,

    
});
// Model Name (collection "matches" will be created/generated)
const user = mongoose.model("user",userSchema);

// Make file exportable
module.exports = user;

userSchema.plugin(uniqueValidator);