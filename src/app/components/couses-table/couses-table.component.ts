import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-couses-table',
  templateUrl: './couses-table.component.html',
  styleUrls: ['./couses-table.component.css']
})
export class CousesTableComponent implements OnInit {
  courses:any= []
  teacherId: any;

  constructor(private router: Router , private courseService:CourseService) { }

  ngOnInit() {
    this.teacherId=localStorage.getItem("userIdEducation");
    this.courseService.getAllCourses(this.teacherId).subscribe(
      (data) => { this.courses = data.coursesArray }
    )
  }

  displayCourse(id){
    this.router.navigate([`courseInfo/${id}`]);
  }
  
  goToEdit(id:any){
    this.router.navigate([`editCourse/${id}`]);
  }
  deleteCourse(id:any){
    
      this.courseService.deleteCourse(id).subscribe(
        (data) => {
          console.log("Here response from BE", data.isDeleted);
          this.courseService.getAllCourses(this.teacherId).subscribe(
            (data) => {
              this.courses = data.coursesArray;
            }
          );
        })
    }
}
