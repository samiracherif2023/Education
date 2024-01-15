import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  Home: string = "Home";
  Courses: string = "Courses";
  Admin: string = "Admin";
  Teacher: string = "Teacher";
  Student: string = "Student";
  Parent: string = "Parent";
  userRole:string;
  userId:string;

  constructor() { }

  ngOnInit() {
    this.userRole=localStorage.getItem("userRoleEducation");
    this.userId=localStorage.getItem("userIdEducation");
  }
  logout(){
    localStorage.removeItem("userIdEducation");
    localStorage.removeItem("userRoleEducation");
  }
}
