import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class NoteService {
  noteURL: string = "http://localhost:3000/notes";
  constructor(private httpClient:HttpClient) { }

//Response :  MESSAGE
addNote(obj){
  return this.httpClient.post<{message:string}>(`${this.noteURL}/note`, obj);
}
  
getAllNotes(id:any){
  return this.httpClient.get<{ notesArray: any }>(`${this.noteURL}/note/getAll/${id}`);
}


getNoteParent(tel:any){
  return this.httpClient.get<{ note: any }>(`${this.noteURL}/note/parents/parent/${tel}`);
}
getNoteById(id:any){
  return this.httpClient.get<{note:any}>(`${this.noteURL}/note/${id}`);
}
}
