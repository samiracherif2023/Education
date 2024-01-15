import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MarkerService } from './services/marker.service';
import { PopupService } from './services/popup.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CarouselComponent } from './components/carousel/carousel.component';
import { ServiceComponent } from './components/service/service.component';
import { StartComponent } from './components/start/start.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { CoursesComponent } from './components/courses/courses.component';
import { InstructorsComponent } from './components/instructors/instructors.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupTeacherComponent } from './components/signup-teacher/signup-teacher.component';
import { SignupAdminComponent } from './components/signup-admin/signup-admin.component';
import { LoginComponent } from './components/login/login.component';
import { AdminComponent } from './components/admin/admin.component';
import { TeacherComponent } from './components/teacher/teacher.component';
import { StudentComponent } from './components/student/student.component';
import { AddCourseComponent } from './components/add-course/add-course.component';
import { CousesTableComponent } from './components/couses-table/couses-table.component';
import { StudentsTableComponent } from './components/students-table/students-table.component';
import { CourseInfoComponent } from './components/course-info/course-info.component';
import { EditCourseComponent } from './components/edit-course/edit-course.component';
import { TeachersTableComponent } from './components/teachers-table/teachers-table.component';
import { StudentInfoComponent } from './components/student-info/student-info.component';
import { StudentsTeacherComponent } from './components/students-teacher/students-teacher.component';
import { GiveNoteComponent } from './components/give-note/give-note.component';
import { GiveAvisComponent } from './components/give-avis/give-avis.component';
import { NotesTableComponent } from './components/notes-table/notes-table.component';
import { AvisTableComponent } from './components/avis-table/avis-table.component';
import { CourseComponent } from './components/course/course.component';
import { InstructorComponent } from './components/instructor/instructor.component';
import { SpacePipe } from './pipes/space.pipe';
import { SafePipe } from './pipes/safe.pipe';
import { SignupParentComponent } from './components/signup-parent/signup-parent.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { CoursesTableComponent } from './components/courses-table/courses-table.component';
import { ParentTableComponent } from './components/parent-table/parent-table.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CarouselComponent,
    ServiceComponent,
    StartComponent,
    CategoriesComponent,
    CoursesComponent,
    InstructorsComponent,
    TestimonialComponent,
    FooterComponent,
    HomeComponent,
    SignupComponent,
    SignupTeacherComponent,
    SignupAdminComponent,
    LoginComponent,
    AdminComponent,
    TeacherComponent,
    StudentComponent,
    AddCourseComponent,
    CousesTableComponent,
    StudentsTableComponent,
    CourseInfoComponent,
    EditCourseComponent,
    TeachersTableComponent,
    StudentInfoComponent,
    StudentsTeacherComponent,
    GiveNoteComponent,
    GiveAvisComponent,
    NotesTableComponent,
    AvisTableComponent,
    CourseComponent,
    InstructorComponent,
    SpacePipe,
    SafePipe,
    SignupParentComponent,
    UsersTableComponent,
    EditProfileComponent,
    CoursesTableComponent,
    ParentTableComponent,
    
   
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    
  
  ],
  providers: [
    MarkerService,
    PopupService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
