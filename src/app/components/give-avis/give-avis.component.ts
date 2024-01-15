import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { generatedId } from 'src/app/shared/generatId';

@Component({
  selector: 'app-give-avis',
  templateUrl: './give-avis.component.html',
  styleUrls: ['./give-avis.component.css']
})
export class GiveAvisComponent implements OnInit {
  avisForm:FormGroup;
  studentAvis:any={};
  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
  }
  validate(){
    let avis=JSON.parse(localStorage.getItem("avis")||"[]");
let teacherId=localStorage.getItem("connectedUserIdProjet");
this.studentAvis.id=generatedId(avis);
this.studentAvis.studentId=this.activatedRoute.snapshot.paramMap.get("id");
this.studentAvis.teacherId=teacherId;
avis.push(this.studentAvis);
localStorage.setItem("avis",JSON.stringify(avis));
  }

}
