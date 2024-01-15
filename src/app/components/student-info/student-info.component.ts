import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-student-info',
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.css']
})
export class StudentInfoComponent implements OnInit {
  user: any={};
  course: any={};
  teacher: any={};
  users: any = [];
  teachersTab:any=[];
  studentTab:any=[];
  coursesTab:any=[];
  id:any;
  role:any;
  teacherId:any;
  // student:any;
  affectForm:FormGroup;
  changePasswordForm:FormGroup;
  validatePasswordForm:FormGroup;
  modifie:boolean=false;
  errorMsg:any;
  userId:any;
  roleId:any;
  constructor(private activateRoute: ActivatedRoute,private courseService:CourseService, private userService:UserService, private router:Router) { }

  ngOnInit() {
    this.userId=localStorage.getItem("userIdEducation");
    this.roleId=localStorage.getItem("userRoleEducation");
    this.teacherId=localStorage.getItem("userIdEducation");
    this.role=localStorage.getItem("userRoleEducation");
    this.id = this.activateRoute.snapshot.paramMap.get("x");
    this.userService.getUserInfo(this.id).subscribe(
      (data)=>{
        // console.log(this.id);
        this.user = data.user;
        // console.log(this.user);
      }
    );
    this.userService.getAllTeachers().subscribe(
      (data)=>{
        this.teachersTab=data.teachersArray;
      })

      this.courseService.getAllCourses(this.teacherId).subscribe(
        (data)=>{
          this.coursesTab=data.coursesArray;
        })
  } 

  changePassword(){
    this.modifie=true;
  }
  validatePassword(){
    this.userService.changeUserPassword(this.user).subscribe((data)=>{
      console.log("Here message ", data.message);
      if (data.message == "Check your old password") { 
        this.errorMsg="Check your old password";
      }
        else {
          this.errorMsg="Password changed";
        }
    })
  }
  validate(){
    this.userService.updateUser(this.user).subscribe((data)=>
    {
      console.log("update",data.isUpdated);
      this.router.navigate(["admin"]);
    })
  }
  validateCourse(){
    this.userService.updateUser(this.user).subscribe((data)=>
    {
      console.log("update",data.isUpdated);
      this.router.navigate(["teacher"]);
    });
  }
}
