import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
user:any={}
errorMsg:string;
loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private router: Router, private userService:UserService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({

      email: ["", [ Validators.email]],
      tel: ["", [Validators.minLength(8), Validators.maxLength(8)]],
      password: ["", [Validators.required, Validators.minLength(6), Validators.maxLength(12)]],

    })

  }
  login() {
    console.log("hello");
    this.userService.login(this.loginForm.value).subscribe(
      
      (data)=>{
        console.log("objet", this.loginForm.value)
        if (data.message == "2") { 
          localStorage.setItem("userIdEducation",data.user.id);
          localStorage.setItem("userRoleEducation",data.user.role);
          (data.user.role == "admin")?
          this.router.navigate([`admin`]):
          this.router.navigate([`studentInfo/${data.user.id}`]);
          
        } else {
          this.errorMsg="Please check email/tel/pwd"
        }
      }
    );
  }
}
