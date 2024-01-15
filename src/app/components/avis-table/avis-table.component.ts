import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-avis-table',
  templateUrl: './avis-table.component.html',
  styleUrls: ['./avis-table.component.css']
})
export class AvisTableComponent implements OnInit {
  avis:any=[];
  users:any=[];
  teachersTab:any=[];
  avisStudent:any=[];
  findedTeacher:any={};
  constructor() { }

  ngOnInit() {
    let id= localStorage.getItem("connectedUserIdProjet");
  this.avis=JSON.parse(localStorage.getItem("avis")||"[]");
  this.avisStudent=this.avis.filter((obj)=>{return obj.studentId==id})
  this.users=JSON.parse(localStorage.getItem("usersProjet")||"[]");
   this.teachersTab=this.users.filter((obj)=>{return obj.role=="teacher"})  
}
searchTeacher(id:any){
for (let i = 0; i < this.teachersTab.length; i++) {
if (this.teachersTab[i].id==id) {
  this.findedTeacher=this.teachersTab[i];
  break;
}

}
return this.findedTeacher;
}


}
