// import mongoose module
const mongoose =require ("mongoose");

var uniqueValidator = require('mongoose-unique-validator');
const noteSchema = mongoose.Schema({
    note: String,
    studentId: String,
    teacherId: String,
    telChild:String,

});

// Model Name (collection "notes" will be created/generated)
const note = mongoose.model("note",noteSchema);

// Make file exportable
module.exports = note;
noteSchema.plugin(uniqueValidator);

