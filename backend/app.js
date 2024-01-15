// import express module
const express = require("express");
// create express application
const app = express();
const client = require('twilio')('ACfbe6b4422a2c738b897cbbb1c686d420','7d11bb407c2ec418871508513f6d9af1');
// import body-parser module
const bodyParser = require("body-parser");

// import mongoose module
const mongoose = require('mongoose');
const ObjectID = require('mongodb').ObjectId;
// connect app with db
mongoose.connect('mongodb://127.0.0.1:27017/educationDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});
// import bcrypt module
const bcrypt = require("bcrypt");
// import axios module
const axios = require("axios");
// import multer module
const path = require('path');
const multer = require('multer');

// Configure Body-parser
// Send JSON responses
app.use(bodyParser.json());
// Get objects from Request 
app.use(bodyParser.urlencoded({ extended: true }));
// upload files Config
app.use('/images', express.static(path.join('backend/images')))
const MIME_TYPE = {
    'image/png': 'png',
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'application/pdf': 'pdf',
}
const storageConfig = multer.diskStorage({
    // destination
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE[file.mimetype];
        let error = new Error("Mime type is invalid");
        if (isValid) {
            error = null;
        }
        cb(null, 'backend/images')
    },
    filename: (req, file, cb) => {
        const name = file.originalname.toLowerCase().split(' ').join('-');
        const extension = MIME_TYPE[file.mimetype];
        const imgName = name + '-' + Date.now() + '-education-' + '.' +
            extension;
        cb(null, imgName);
    }
});
// Security configuration
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
        "Access-Control-Allow-Headers",
        "Origin, Accept, Content-Type, X-Requested-with, Authorization, expiresIn"
    );
    res.setHeader(
        "Access-Control-Allow-Methods",
        "GET, POST, DELETE, OPTIONS, PATCH, PUT"
    );
    next();
});



// Models Importation
const User = require("./models/user");
const Note = require("./models/note");
const Course = require("./models/course");
const { error } = require("console");
// const { userError } = require("@angular/compiler-cli/src/transformers/util");


//Business Logic : Get USER by Id
app.get("/users/:id", (req, res) => {
    //
    console.log("here into bl: get user by id");
    let id = req.params.id;
    User.findOne({ _id: id }).then((doc) => {
        res.json({ user: doc });
    })
})

// Business Logic: signup student

app.post("/users/signup/student", multer({ storage: storageConfig }).single('img'), (req, res) => {

    console.log("Here into BL: Signup student", req.body);
    bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
        console.log("crypted pwd", cryptedPwd);
        let url = req.protocol + "://" + req.get("host");
        let imgPath;
        imgPath = req.file ? url + "/images/" + req.file.filename : url + "/images/avatar.png";
        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: cryptedPwd,
            tel: req.body.tel,
            adress: req.body.adress,
            level: req.body.level,
            role: req.body.role,
            img: imgPath,
        });
        user.save((err, doc) => {
            console.log("here error", err)
            if (err) {
                res.json({ message: false });
            }
            else {
                res.json({ message: true });
            }
        });
    });
});


// Business Logic: signup teacher

app.post("/users/signup/teacher", multer({ storage: storageConfig }).single('cv'), (req, res) => {

    console.log("Here into BL: Signup teacher", req.body);
    bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
        console.log("crypted pwd", cryptedPwd);
        let url = req.protocol + "://" + req.get("host");
        let cvPath;
        cvPath = req.file ? url + "/images/" + req.file.filename : url + "/images/cv.png";
        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: cryptedPwd,
            tel: req.body.tel,
            adress: req.body.adress,
            speciality: req.body.speciality,
            role: req.body.role,
            cv: cvPath,
        });
        user.save((err, doc) => {
            console.log("here error", err)
            if (err) {
                res.json({ message: false });
            }
            else {
                res.json({ message: true });
            }
        });
    });
});


// Business Logic: signup parent

app.post("/users/signup/parent", (req, res) => {

    console.log("Here into BL: Signup PARENT", req.body);
    bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {

        User.findOne({ tel: req.body.telChild })
            .then((response) => {
                console.log("here response bl:", response)
                if (!response) {
                    res.json({ message: false });
                }
                else {
                    let user = new User({
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        email: req.body.email,
                        password: cryptedPwd,
                        tel: req.body.tel,
                        telChild: req.body.telChild,
                        adress: req.body.adress,
                        role: req.body.role,
                    });
                    user.save((err, doc) => {
                        console.log("here error", err)
                        if (err) {
                            res.json({ message: false });
                        }
                        else {
                            res.json({ message: true });
                        }
                    });
                }
            });

    });
});
// Business Logic: signup admin

app.post("/users/signup/admin", (req, res) => {

    console.log("Here into BL: Signup admin", req.body);
    bcrypt.hash(req.body.password, 8).then((cryptedPwd) => {
        console.log("crypted pwd", cryptedPwd);
        let user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: cryptedPwd,
            tel: req.body.tel,
            role: req.body.role,
        });
        user.save((err, doc) => {
            console.log("here error", err)
            if (err) {
                res.json({ message: false });
            }
            else {
                res.json({ message: true });
            }
        });
    });
});


// Business Logic :login
app.post("/users/login", (req, res) => {
    console.log("Here into BL: Login", req.body);
    let user = req.body;
    let userToSend;
    User.findOne({ $or: [{ email: user.email }, { tel: req.body.tel }] })
        .then((response) => {
            // console.log("Here Response", response);

            if (!response) {
                res.json({ message: "0" });
            }
            else {
                userToSend = response;
                bcrypt.compare(user.password, response.password)
                    .then((pwdResponse) => {
                        console.log("Here pwdResponse", pwdResponse);
                        if (!pwdResponse) {
                            res.json({ message: "1" });
                        }
                        else {
                            // Object {fName, lName ,id, role}
                            let userObj = {
                                id: userToSend._id,
                                fName: userToSend.firstName,
                                lName: userToSend.lastName,
                                role: userToSend.role,
                            }
                            res.json({ message: "2", user: userObj });
                        }
                    });
            }
        });
});

// Business Logic : get all users filtrés

app.get("/users", (req, res) => {
    usersArray = [];
    console.log("here all users");
    User.find().then((docs) => {
        let teachersArray = docs.filter((obj) => { return obj.role == "teacher" });
        let studentArray = docs.filter((obj) => { return obj.role == "student" });
        let parentArray = docs.filter((obj) => { return obj.role == "parent" });
        response1 = teachersArray.concat(studentArray);
        response2 = response1.concat(parentArray);
        console.log("Here docs", docs);
        //  
        res.json({ usersArray: response2 });
    });
});

// Business Logic : delete user
app.delete("/users/:id", (req, res) => {
    //
    console.log("here into bl: delete user ");
    let id = req.params.id;
    User.deleteOne({ _id: id }).then((response) => {
        console.log("here response", response);
        if (response.deletedCount == 1) {
            res.json({ isDeleted: true });
        }
        else {
            res.json({ isDeleted: false });
        }
    });
});

//Business Logic : edit profile
app.put("/users", (req, res) => {
    //
    console.log("here into bl: edit profile ")
    let newProfile = req.body;
    User.updateOne({ _id: newProfile._id }, newProfile).then((response) => {
        console.log("Here response after update", response);
        if (response.nModified == 1) {
            res.json({ isUpdated: true });
        }
        else {
            res.json({ isUpdated: false });
        }
    });
});

// Business Logic : get all teachers

app.get("/users/teacher/getAll", (req, res) => {

    User.find().then((docs) => {
        let response = docs.filter((obj) => { return obj.role == 'teacher' });
        res.json({ teachersArray: response });
    });
})
// Business Logic: affecte student to teacher
app.put("/users/updateUser", (req, res) => {
    let newUser = req.body;
    console.log(req.body);
    User.updateOne({ _id: newUser._id }, newUser).then(
        (response) => {
            if (response.nModified == 1) {
                res.json({ isUpdated: true });
            }
            else {
                res.json({ isUpdated: false });
            }
        }
    )
})
// Business Logic : get all students of teacher

app.get("/users/student/getAll/:id", (req, res) => {
    let teacherId = req.params.id;
    User.find({ teacherId: teacherId }).then((docs) => {
        console.log("bisness logique", docs)
        res.json({ studentsArray: docs });
    });
})

// Business Logic :add note

app.post("/notes/note", (req, res) => {
    console.log("Here into add note", req.body);
    const note = new Note({
        note: req.body.note,
        teacherId: req.body.teacherId,
        studentId: req.body.studentId,
        // telChild: req.params.tel,
    });
    note.save((err, result) => {
        console.log("Error", err);
        if (result) {
            res.status(200).json({
                message: "note added with success",
            });
        }
    });
});

// Business Logic : add Course
app.post("/courses/course", (req, res) => {
    console.log("Here into add course", req.body);
    const course = new Course({
        name: req.body.name,
        description: req.body.description,
        module: req.body.module,
        teacherId: req.body.teacherId,

    });
    course.save((err, result) => {
        console.log("Error", err);
        if (result) {
            res.status(200).json({
                message: "Course added with success",
            });
        }
    });
});

// Business Logic : get all courses of teacher

app.get("/courses/:id", (req, res) => {
    let teacherId = req.params.id;

    Course.find({ teacherId: teacherId }).then((docs) => {

        res.json({ coursesArray: docs });
    });
})
// Business Logic : get all courses 

app.get("/courses", (req, res) => {
    

    Course.find().then((docs) => {

        res.json({ coursesArray: docs });
    });
})
// Business Logic get all courses for student
app.get("/courses/course/student/:id", (req, res) => {
    let id = req.params.id;
    Course.find({ _id: id }).then(
        (docs) => {
            res.json({ coursesArray: docs });
        });
});

// Business Logic affect Teacher Course
app.get("/courses/course/student/teacher/x/:id", (req, res) => {
    let id = req.params.id;
    User.find({ _id: id }).then((docs) => {
        console.log("The teacher how affect course", docs);
    }
    )
});
//Business Logic : Get COURSE by Id
app.get("/courses/course/:id", (req, res) => {
    //
    console.log("here into bl: get course by id");
    let id = req.params.id;
    Course.findOne({ _id: id }).then((doc) => {
        res.json({ course: doc });
    })
})

// Business Logic : delete course
app.delete("/courses/:id", (req, res) => {
    //
    console.log("here into bl: delete user ");
    let id = req.params.id;
    Course.deleteOne({ _id: id }).then((response) => {
        console.log("here response", response);
        if (response.deletedCount == 1) {
            res.json({ isDeleted: true });
        }
        else {
            res.json({ isDeleted: false });
        }
    });
});

//Business Logic : edit course
app.put("/courses", (req, res) => {
    //
    console.log("here into bl: edit course ")
    let newCourse = req.body;
    Course.updateOne({ _id: newCourse._id }, newCourse).then((response) => {
        console.log("Here response after update", response);
        if (response.nModified == 1) {
            res.json({ isUpdated: true });
        }
        else {
            res.json({ isUpdated: false });
        }
    });
});

// Business Logic : get all notes of student

app.get("/notes/note/getAll/:id", (req, res) => {
    let studentId = req.params.id;
    console.log("HEEEERE", studentId);
    Note.find({ studentId: studentId }).then((docs) => {
        console.log("bisness logique", docs);
        res.json({ notesArray: docs });
    });
})

// Business Logic : get note student for parent
app.get("/notes/note/parents/parent/:tel",(req,res)=>{
    let telChild=req.params.tel;
    User.findOne({tel:telChild}).then((docs)=>{
        console.log("here docs",docs);
        res.json({note:docs});
    });
});

// Business Logic : get note by Id
app.get("/notes/note/:id", (req, res) => {
    //
    console.log("here into bl: get note by id");
    let id = req.params.id;
    Note.findOne({ studentId: id }).then((doc) => {
        res.json({ note: doc });
    })
})

// Business Logic Ghange Password
app.put("/users/changePassword",(req,res)=>{
    console.log("here object from fE",req.body);
    User.findOne({_id:req.body._id}).then((doc)=>{
        console.log("here data in DB",doc);
        bcrypt.compare(req.body.oldPassword, doc.password).then((pwdResponse)=>{
            if (!pwdResponse) {
                res.json({message:"Check your old password"});
            }
            else {
                bcrypt.hash(req.body.newPassword,8).then((cryptedPassword)=>{
                    User.updateOne({_id:req.body._id},{password:cryptedPassword}).then((response)=>{
                        if (response.nModified==1) {
                            res.json({message:"Password changed"});
                        }
                        else {
                            res.json({message:"Error"});
                        }
                    })
                })
            }
        })
    })
})

// Business Logic send message TWILIO
app.get("/messages",(req,res)=>{
    sendTextMessage();
    res.send(`<p> Hello </p>`);

  
});

function sendTextMessage() {
    client.messages.create({
      body: 'Hello from twilio-node',
      to: '+21693314316', // Text your number
      from: '+14302305752', // From a valid Twilio number
    })
    .then((message) => console.log(message))
    .catch((error)=> console.log(error));

}

//make app importable
module.exports = app;