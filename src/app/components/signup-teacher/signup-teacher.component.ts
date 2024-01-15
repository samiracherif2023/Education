import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';


@Component({
  selector: 'app-signup-teacher',
  templateUrl: './signup-teacher.component.html',
  styleUrls: ['./signup-teacher.component.css']
})
export class SignupTeacherComponent implements OnInit {
  teacherForm: FormGroup;
  user:any={};
  errorMsg:string;
  imagePreview:any;
  constructor( private formBuilder:FormBuilder , private userService:UserService , private router:Router) { }

  ngOnInit() {
    this.teacherForm = this.formBuilder.group({
      firstName: ["", [Validators.required, Validators.minLength(3)]],
      lastName: ["", [Validators.required, Validators.minLength(5)]],
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required, Validators.minLength(6)]],
      tel: ["", [Validators.minLength(8), Validators.maxLength(8)]],
      adress: ["", [Validators.required]],
      speciality: ["", [Validators.required]],
      cv:[""],
      role:["teacher"],
    })
  }
  signupTeacher(){
    this.teacherForm.value.role="teacher";
    this.userService.signupTeacher(this.teacherForm.value, this.teacherForm.value.cv).subscribe(
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
    this.teacherForm.patchValue({ cv: file });
    this.teacherForm.updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
    this.imagePreview = reader.result as string
    };
    reader.readAsDataURL(file);
    }
}
