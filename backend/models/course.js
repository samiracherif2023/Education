// import mongoose module
const mongoose =require ("mongoose");

var uniqueValidator = require('mongoose-unique-validator');
const courseSchema = mongoose.Schema({
    name: String,
    description: String,
    module:String,
    teacherId: String,

    
});
// Model Name (collection "matches" will be created/generated)
const course = mongoose.model("course",courseSchema);

// Make file exportable
module.exports = course;

courseSchema.plugin(uniqueValidator);