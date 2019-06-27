import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit {


  email:string;
  password:string;
  typeUser;
  errorEmail:string[];
  errorPassword:string[];


  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
  }

  
  login()
  {
    this.httpClient.post("http://127.0.0.1:8000/api/login",
    {
      "email" : this.email,
      "password" : this.password,
    })
    .subscribe(
        data => {
            console.log("POST Request is successful ", data);
            //window.location.href='/client-home';
            this.typeUser = data['success']['typeOfUsers'];
            if(this.typeUser == 3)
            {
              localStorage.setItem("adminEmail", data['success']['email']);
              localStorage.setItem("adminToken", data['success']['token']);
              localStorage.setItem("typeOfUsers", data['success']['typeOfUsers']);
              this.errorEmail = [];
              this.errorPassword = [];
              window.location.href='/admin-home';
            }
            else
            {
              window.location.href='/login';
            }
        },
        error => {
          console.log(error);
          this.errorEmail = error['error']['email'];
          this.errorPassword = error['error']['password'];
        }
    );  
  }

  
}
