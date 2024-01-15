import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-notes-table',
  templateUrl: './notes-table.component.html',
  styleUrls: ['./notes-table.component.css']
})
export class NotesTableComponent implements OnInit {
  notes: any = [];
  studentId: any;
  note:any={};
  constructor(private noteService:NoteService) { }

  ngOnInit() {

    this.studentId=localStorage.getItem("userIdEducation");
    console.log("this student Id",this.studentId)
    this.noteService.getAllNotes(this.studentId).subscribe(
      (data) => 
      { this.notes = data.notesArray }
      

    )
    // let id = localStorage.getItem("connectedUserIdProjet");
    // this.notes = JSON.parse(localStorage.getItem("notes") || "[]");
    // this.notesStudent = this.notes.filter((obj) => { return obj.studentId == id })
    // this.users = JSON.parse(localStorage.getItem("usersProjet") || "[]");
    // this.teachersTab = this.users.filter((obj) => { return obj.role == "teacher" })
  }




  // searchTeacher(id: any) {
  //   for (let i = 0; i < this.teachersTab.length; i++) {
  //     if (this.teachersTab[i].id == id) {
  //       this.findedTeacher = this.teachersTab[i];
  //       break;
  //     }

  //   }
  //   return this.findedTeacher;
  // }

  noteColor(n) {
    if (0 < n && n < 5) {
      return "red";
    }
    else if (5 < n && n < 10) {
      return "orange";
    }
    else if (10 < n && n < 15) {
      return "blue";
    }
    else {
      return "green";
    }


  }
}
