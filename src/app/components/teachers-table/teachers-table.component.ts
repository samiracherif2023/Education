import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-teachers-table',
  templateUrl: './teachers-table.component.html',
  styleUrls: ['./teachers-table.component.css']
})
export class TeachersTableComponent implements OnInit {
  teachersTab: any = [];
  users: any = [];
  constructor() { }

  ngOnInit() {
    this.users = JSON.parse(localStorage.getItem("usersProjet") || "[]");
    for (let i = 0; i < this.users.length; i++) {
      if (this.users[i].role == "teacher") {
        this.teachersTab.push(this.users[i]);
      }
    }
  }

  confirm(id){
    for (let i = 0; i < this.teachersTab.length; i++) {
      
      if (this.teachersTab[i].id == id ) {
        this.teachersTab[i].status = 'ok';
        
        break;
    }
      
    }
    localStorage.setItem('usersProjet', JSON.stringify(this.users));

  }
}