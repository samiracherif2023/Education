import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-edit-course',
  templateUrl: './edit-course.component.html',
  styleUrls: ['./edit-course.component.css']
})
export class EditCourseComponent implements OnInit {
  coursesTab: any = [];
  editCourseForm: FormGroup;
  id:any;
  course:any={};
  constructor(private activateRoute: ActivatedRoute, private formBuilder: FormBuilder, private router: Router, private courseService:CourseService) { }

  ngOnInit() {
     //Création des inputs: formBuilde.group({})
     this.editCourseForm = this.formBuilder.group({
      name: [''],
      description: [''],
      module: ['']
    })
    this.id = this.activateRoute.snapshot.paramMap.get("x");
    this.courseService.getCourseInfo(this.id).subscribe(
      (data)=> {
        this.course=data.course;
      });
 
  }


  editCourse() {
    this.courseService.editCourse(this.course).subscribe(
      (data)=>{
        console.log("Here data after edit",data);
      }
    )
this.router.navigate(["teacher"]);
  }

}
