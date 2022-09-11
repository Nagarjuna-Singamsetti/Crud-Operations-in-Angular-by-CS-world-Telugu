import { Component, OnInit } from '@angular/core';
import { MobileService } from 'src/app/service/mobile.service';

@Component({
  selector: 'app-mobile-list',
  templateUrl: './mobile-list.component.html',
  styleUrls: ['./mobile-list.component.css']
})
export class MobileListComponent implements OnInit {

  public users: any;
  public formHeader = "Add User";
  public firstname = "";
  public lastname = "";
  public email = "";
  public age: number = 0;
  public id = null;
  public showForm = false;

  constructor(private _user: MobileService) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this._user.fetchUsers().subscribe(
      (data: any) => { this.users = data },
      (error) => { console.log("error") }
    )
  }

  deleteUser(id: any) {
    this._user.removeUser(id).subscribe(
      (response) => { this.getUsers() }
    )
  }

  openForm(data: any = null) {
    this.clearForm();
    this.showForm = true;
    if (data) {
      this.firstname = data.firstName;
      this.lastname = data.lastName;
      this.email = data.email;
      this.age = data.age;
      this.id = data.id;
      this.formHeader = "Edit User"
    }
    else {
      this.id = null;
      this.formHeader = "Add User"
    }
  }

  closeForm() {
    this.showForm = false;
    this.clearForm();
  }

  clearForm() {
    this.firstname = '';
    this.lastname = '';
    this.email = '';
    this.age = 0;
  }

  saveUser() {
    this.showForm = false;
    let body: any = {
      firstName: this.firstname,
      lastName: this.lastname,
      email: this.email,
      age: this.age
    }
    if (this.id) {
      body['id'] = this.id;
      this._user.putUser(body).subscribe(
        (res) => {
          this.getUsers()
        }
      )
    }
    else {
      this._user.postUser(body).subscribe(
        (res) => {
          this.getUsers()
        }
      )
    }
  }
}
