import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  courseURL: string = "http://localhost:3000/courses";
  constructor(private httpClient:HttpClient) { }


  addCourse(obj: any) {
    return this.httpClient.post<{ message: string }>(this.courseURL + "/course", obj);
  }
getCourses(){
  return this.httpClient.get<{ coursesArray: any }>(this.courseURL);
}
  getAllCourses(id) {
    return this.httpClient.get<{ coursesArray: any }>(`${this.courseURL}/${id}`);
  }
  getAllCoursesStudent(id) {
    return this.httpClient.get<{ coursesArray: any }>(`${this.courseURL}/course/student/${id}`);
  }

  getAllCoursesTeacher(id) {
    return this.httpClient.get(`${this.courseURL}/course/student/teacher/x/${id}`);
  }
  getCourseInfo(id: any) {
    return this.httpClient.get<{course:any}>(`${this.courseURL}/course/${id}`);
  }

  deleteCourse(id: any) {
    return this.httpClient.delete<{isDeleted:boolean}>(`${this.courseURL}/${id}`);
  }
  editCourse(newCourse) {
    return this.httpClient.put(this.courseURL, newCourse);
  }


}
