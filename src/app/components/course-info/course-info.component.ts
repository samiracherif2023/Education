import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from 'src/app/services/course.service';

@Component({
  selector: 'app-course-info',
  templateUrl: './course-info.component.html',
  styleUrls: ['./course-info.component.css']
})
export class CourseInfoComponent implements OnInit {
  id:any;
  courses:any;
  course:any ={};
  users: any = [];
  constructor(private activateRoute: ActivatedRoute, private courseService:CourseService) { }

  ngOnInit() {
    this.id = this.activateRoute.snapshot.paramMap.get("x");
    this.courseService.getCourseInfo(this.id).subscribe(
      (data)=>{
        this.course = data.course;
      });
}

}