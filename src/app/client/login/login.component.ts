import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  loginPhoto:string = "src/assets/images/sections-3.jpg";
  //loginBackground:string = "src/assets/images/slider1.jpg";

  lang = "english";

  email:string;
  password:string;
  typeUser;
  errorEmail:string[];
  errorPassword:string[];

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    if(localStorage.getItem("lang")!=null)
    {
      this.lang = localStorage.getItem("lang");
    }
  }

  moveToRegister()
  {
    window.location.href='/register';
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
            localStorage.setItem("email", data['success']['email']);
            localStorage.setItem("token", data['success']['token']);
            localStorage.setItem("typeOfUsers", data['success']['typeOfUsers']);
            localStorage.setItem("clientID", data['success']['id']);
            if(this.typeUser == 1)
            {
              window.location.href='/client-home';
            }

            if(this.typeUser == 2)
            {
              window.location.href='/freelancer-home';
            }
            if(this.typeUser == 3)
            {
              window.location.href='/admin';
            }
            this.errorEmail = [];
            this.errorPassword = [];
        },
        error => {
          console.log(error);
          this.errorEmail = error['error']['email'];
          this.errorPassword = error['error']['password'];
        }
    );  
  }

}
