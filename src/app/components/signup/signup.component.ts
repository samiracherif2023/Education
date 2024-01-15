import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
studentForm: FormGroup;
user:any={};
errorMsg:string;
imagePreview:any;
  constructor( private userService:UserService , private router:Router , private formBuilder:FormBuilder) { }

  ngOnInit() {
    this.studentForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      tel: ["", [Validators.minLength(8), Validators.maxLength(8)]],
      adress: ["", [Validators.required]],
      level: ["", [Validators.required]],
      img:[""],
    })
  }
  signupStudent(){
    this.studentForm.value.role="student";
    this.userService.signupStudent(this.studentForm.value, this.studentForm.value.img).subscribe(
      (data)=> {
        console.log("Here data after signup student",data.message);
        if (data.message) {
          this.router.navigate(["login"]);
        }
        else {
          this.errorMsg="Email or Phone Exists";
        }
      }
    );
  }

  onImageSelected(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.studentForm.patchValue({ img: file });
    this.studentForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }
}
