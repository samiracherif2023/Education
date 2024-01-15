import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';
import { generatedId } from 'src/app/shared/generatId';
@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router:Router, private courseService:CourseService) { }

  ngOnInit() {
    this.courseForm = this.formBuilder.group({
      name: ["", [Validators.required]],
      description: ["", [Validators.required]],
      module: ["", [Validators.required]],
    })
  }
  addCourse() {
    let teacherId = localStorage.getItem("userIdEducation");
    this.courseForm.value.teacherId = teacherId;
    this.courseService.addCourse(this.courseForm.value).subscribe(
      (data)=> {
        console.log("Here data from BE",data.message);
        this.router.navigate(["teacher"]);
            }
    );
  }
}
