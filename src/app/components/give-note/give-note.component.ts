import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NoteService } from 'src/app/services/note.service';
import { generatedId } from 'src/app/shared/generatId';

@Component({
  selector: 'app-give-note',
  templateUrl: './give-note.component.html',
  styleUrls: ['./give-note.component.css']
})
export class GiveNoteComponent implements OnInit {
  noteForm: FormGroup;
  student: any = {};
  note: any = {};
  constructor(private activatedRoute: ActivatedRoute, private noteService:NoteService, private router:Router) { }

  ngOnInit() {
  }
  validate() {

let teacherId=localStorage.getItem("userIdEducation");
let studentId= this.activatedRoute.snapshot.paramMap.get("x");
// let studentTelCild= this.activatedRoute.snapshot.paramMap.get("tel");
this.note.studentId=studentId;
this.note.teacherId=teacherId;
// this.note.telChild=studentTelCild;

this.noteService.addNote(this.note).subscribe(
  (data)=>{
    console.log(this.note);
    console.log("Here data response", data.message);
    
  });

  }
}
