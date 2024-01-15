import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html',
  styleUrls: ['./users-table.component.css']
})
export class UsersTableComponent implements OnInit {
  users: any = [];

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      (data) => { this.users = data.usersArray }
    )
  }

  goToEditUser(id: any) {

    this.router.navigate([`editUser/${id}`]);

  }
  goToProfile(id: any) {
    this.router.navigate([`studentInfo/${id}`]);
  }


  deleteUser(id:any) {
    this.userService.deleteUser(id).subscribe(
      (data) => {
        console.log("Here response from BE", data.isDeleted);
        this.userService.getAllUsers().subscribe(
          (data) => {
            this.users = data.usersArray;
          }
        );
      })
  }

}
