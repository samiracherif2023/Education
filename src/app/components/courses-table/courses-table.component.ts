import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-courses-table',
  templateUrl: './courses-table.component.html',
  styleUrls: ['./courses-table.component.css']
})
export class CoursesTableComponent implements OnInit {
  courses:any= []
  teachers:any= []
  id: any;
  constructor( private courseService:CourseService, private userService:UserService) { }

  ngOnInit() {

    this.id=localStorage.getItem("userIdEducation");
this.userService.getUserInfo(this.id).subscribe(
  (data)=>{
    console.log("Here user",data.user);
    this.courseService.getAllCoursesStudent(data.user.courseId).subscribe(
      (data)=>{
        this.courses = data.coursesArray;
        this.courseService.getAllCoursesTeacher(this.courses[0].teacherId).subscribe()
      });
      this.userService.getAllTeachers().subscribe((data)=>{
        this.teachers=data.teachersArray;
      })
  });

  }

  searchTeacher(id:any){
    return this.teachers.find((elt:any)=>{return elt._id==id});
  }
}
