import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupTeacherComponent } from './components/signup-teacher/signup-teacher.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { StudentComponent } from './components/student/student.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { GiveNoteComponent } from './components/give-note/give-note.component';
import { GiveAvisComponent } from './components/give-avis/give-avis.component';
import { CoursesComponent } from './components/courses/courses.component';
import { SignupParentComponent } from './components/signup-parent/signup-parent.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { ParentTableComponent } from './components/parent-table/parent-table.component';


const routes: Routes = [
    //http://localhost:4200/ => Home component will be displayed
    { path: "", component: HomeComponent },
    {path:"signup",component: SignupComponent},
    {path:"signupTeacher" ,component:SignupTeacherComponent},
    {path:"signupAdmin", component:SignupAdminComponent},
    {path:"login",component:LoginComponent},
    {path:"admin",component:AdminComponent},
    {path:"teacher",component:TeacherComponent},
    {path:"student",component:StudentComponent},
    {path:"addCourse",component:AddCourseComponent},
    {path:"courseInfo/:x",component:CourseInfoComponent},
    {path:"editCourse/:x",component:EditCourseComponent},
    {path:"studentInfo/:x",component:StudentInfoComponent},
    {path:"giveNote/:x",component:GiveNoteComponent},
    {path:"giveAvis/:id",component:GiveAvisComponent},
    {path:"courses",component:CoursesComponent},
    {path:"signupParent",component:SignupParentComponent},
    {path:"editUser/:x",component:EditProfileComponent},
    {path:"parent",component:ParentTableComponent},
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
