import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-signup-parent',
  templateUrl: './signup-parent.component.html',
  styleUrls: ['./signup-parent.component.css']
})
export class SignupParentComponent implements OnInit {
  parentForm: FormGroup;
  user:any={};
  errorMsg:string;
  constructor(private formBuilder:FormBuilder , private userService:UserService , private router:Router) { }

  ngOnInit() {
    this.parentForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      tel: ["", [Validators.minLength(8), Validators.maxLength(8)]],
      telChild: ["", [Validators.minLength(8), Validators.maxLength(8)]],
      adress: ["", [Validators.required]],
     
    })
  }

  signupParent(){
    this.parentForm.value.role="parent";
    console.log(this.parentForm.value);
    this.userService.signupParent(this.parentForm.value).subscribe(
      (data)=> {
        console.log("Here data after signup parent",data.message);
        if (data.message) {
          this.router.navigate(["login"]);
        }
        else {
          this.errorMsg="Email or Phone Exists";
        }
      });
}}
