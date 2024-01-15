import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-students-teacher',
  templateUrl: './students-teacher.component.html',
  styleUrls: ['./students-teacher.component.css']
})
export class StudentsTeacherComponent implements OnInit {
  student:any={}
  users: any = [];
  studentsArray: any = [];
  teacherId: any;
  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
this.teacherId=localStorage.getItem("userIdEducation");
    this.userService.getAllStudents(this.teacherId).subscribe(
      (data) => { this.users = data.studentsArray }
    )

  }

  goToGiveNote(id: any) {
    this.router.navigate([`giveNote/${id}`]);
  }

  goToGiveAvis(id: any) {
    this.router.navigate([`giveAvis/${id}`]);
  }
  affectCourse(id: any) {
    this.router.navigate([`studentInfo/${id}`]);
  }
}

