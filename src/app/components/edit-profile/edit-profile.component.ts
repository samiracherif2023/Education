import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {
  id:any;
  user:any={};
  editForm:FormGroup;
  constructor(private activateRoute: ActivatedRoute , private router:Router, private userService:UserService, private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.editForm = this.formBuilder.group({
      firstName: [""],
      lastName: [""],
      email: [""],
      password: [""],
      tel: [""],
      telChild: [""],
      adress: [""],
      level: [""],
      speciality: [""],
      img:[""],
    })
    this.id= this.activateRoute.snapshot.paramMap.get("x");
    this.userService.getUserInfo(this.id).subscribe(
      (data)=> {
        this.user=data.user;
      });
  }

  editProfile(){
    this.userService.editProfile(this.user).subscribe(
      (data)=>{
        console.log("Here data after edit",data);
      }
    )
this.router.navigate(["admin"]);
  }
}
