import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-parent-table',
  templateUrl: './parent-table.component.html',
  styleUrls: ['./parent-table.component.css']
})
export class ParentTableComponent implements OnInit {
noteObj:any={};
value:any={};
teachers:any=[];
notes:any=[];
  constructor(private userService:UserService, private noteService:NoteService ) { }

  ngOnInit() {
    let id=localStorage.getItem("userIdEducation");
    this.userService.getUserInfo(id).subscribe((data)=>{
      console.log("Here user parent",data.user);
      
      this.noteService.getNoteParent(data.user.telChild).subscribe((data)=>{
        
        console.log("Here data",data);
        this.noteObj=data.note;
        console.log("here noteObj",this.noteObj);
        this.noteService.getNoteById(this.noteObj._id).subscribe((data)=>{
          console.log("hereeeee", this.value)
          this.value=data.note;

        })
      })

    })
    this.userService.getAllTeachers().subscribe((data)=>{
      this.teachers=data.teachersArray;
    })
  
  }
searchTeacher(id:any){
return this.teachers.find((obj:any)=>{return obj._id==id});
}

}
