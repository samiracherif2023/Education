import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userURL: string = "http://localhost:3000/users";
  constructor( private httpClient:HttpClient) { }

  signupStudent(user: any , file:File) {

    let formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("tel", user.tel);
    formData.append("adress", user.adress);
    formData.append("level", user.level);
    formData.append("role", user.role);
    formData.append("img", file);
    return this.httpClient.post<{ message: boolean }>(this.userURL + "/signup/student", formData);
  }

  signupTeacher(user: any, file: File) {

    let formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("tel", user.tel);
    formData.append("adress", user.adress);
    formData.append("speciality", user.speciality);
    formData.append("role", user.role);
    formData.append("cv", file);
    return this.httpClient.post<{ message: boolean }>(this.userURL + "/signup/teacher", formData);
  }
  signupAdmin(user: any) {
    return this.httpClient.post<{ message: boolean }>(this.userURL + "/signup/admin", user);
  }

  signupParent(user: any ) {
    return this.httpClient.post<{ message: boolean }>(this.userURL + "/signup/parent", user);
  }

  // user : {email ,tel, pwd}
  login(user) {
    return this.httpClient.post<{ message: string,user:any }>(this.userURL + "/login", user);
  }

  getAllUsers() {
    return this.httpClient.get<{ usersArray: any }>(this.userURL);
  }

  getUserInfo(id: any) {
    return this.httpClient.get<{user:any}>(`${this.userURL}/${id}`);
  }

  deleteUser(id: any) {
    return this.httpClient.delete<{isDeleted:boolean}>(`${this.userURL}/${id}`);
  }

  editProfile(newProfile) {
    return this.httpClient.put(this.userURL, newProfile);
  }
  getAllTeachers(){
    return this.httpClient.get<{ teachersArray: any }>(this.userURL + "/teacher/getAll");
  }
  getAllStudents(id:any){
    return this.httpClient.get<{ studentsArray: any }>(`${this.userURL}/student/getAll/${id}`);
  }

  // update user: affecte student to teacher and course to student
  updateUser(newUser:any){
    return this.httpClient.put<{isUpdated:string}>(this.userURL+"/updateUser",newUser);
  }

  changeUserPassword(user:any){
    return this.httpClient.put<{message:string}>(this.userURL+"/changePassword",user);
  }
  
}
