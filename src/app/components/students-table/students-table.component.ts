import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-students-table',
  templateUrl: './students-table.component.html',
  styleUrls: ['./students-table.component.css']
})
export class StudentsTableComponent implements OnInit {

  users: any = [];
  studentsTab: any = [];
  constructor(private router: Router) { }

  ngOnInit() {
    this.users = JSON.parse(localStorage.getItem("usersProjet") || "[]");
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].role == "student") {
        this.studentsTab.push(this.users[i]);
      }
    }
  }

affecter(id:any){
  localStorage.setItem("studentId",id);
  this.router.navigate(["studentInfo"]);
}

}


