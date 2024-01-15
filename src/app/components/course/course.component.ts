import { Component, OnInit, Input } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styleUrls: ['./course.component.css']
})
export class CourseComponent implements OnInit {
  users: any = [];
  teachers: any = [];
  @Input() courseInput: any;
  constructor(private userService:UserService) { }

  ngOnInit() {
    // this.users = JSON.parse(localStorage.getItem("usersProjet") || "[]");
    this.userService.getAllTeachers().subscribe((data)=>{
      this.teachers=data.teachersArray;
    })
  }
  searchTeacher(id:any){
    return this.teachers.find((elt:any)=>{return elt._id==id});
  }
}

