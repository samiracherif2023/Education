import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-instructors',
  templateUrl: './instructors.component.html',
  styleUrls: ['./instructors.component.css']
})
export class InstructorsComponent implements OnInit {
  users: any = [];
  teachersTab:any=[];
  constructor(private userService:UserService) { }

  ngOnInit() {
    // this.users = JSON.parse(localStorage.getItem("usersProjet") || "[]");
    // this.teachersTab=this.users.filter((obj)=>{return obj.role=="teacher"});
this.userService.getAllUsers().subscribe((data)=>{
  this.users=data.usersArray;
  this.teachersTab=this.users.filter((obj)=>{return obj.role=="student"});
})
  }


}
