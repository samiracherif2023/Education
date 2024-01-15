import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-signup-admin',
  templateUrl: './signup-admin.component.html',
  styleUrls: ['./signup-admin.component.css']
})
export class SignupAdminComponent implements OnInit {
  adminForm: FormGroup;
  user:any={};
  errorMsg:string;
  constructor( private userService:UserService , private router:Router , private formBuilder:FormBuilder ) { }

  ngOnInit() {
    this.adminForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      tel: ["", [Validators.minLength(8), Validators.maxLength(8)]],
      role:["admin"],
    })
  }

  signupAdmin(){
    this.adminForm.value.role="admin";
    console.log(this.adminForm.value)
    this.userService.signupAdmin(this.adminForm.value).subscribe(
      (data)=> {
        console.log("Here data after signup admin",data.message);
        if (data.message) {
          this.router.navigate(["login"]);
        }
        else {
          this.errorMsg="Email or Phone Exists";
        }
      }
    );
   
  }


}
