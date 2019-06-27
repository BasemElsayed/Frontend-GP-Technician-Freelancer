import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {


  lang = "english";
  
  signUpPhoto:string = "src/assets/images/sections-3.jpg";
  regions:any;

  name:string;
  email:string;
  password:string;
  confirmPassword:string;
  addressBySelect:string;
  latitude:number;
  longitude:number;
  typeOfUsers = 1;
  mobileNumber:string;

  errorName:string[];
  errorPhone:string[];
  errorEmail:string[];
  errorPassword:string[];
  errorCPassword:string[];
  errorAddress:string[];
  errorCity:string[];
  
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    if(localStorage.getItem("lang")!=null)
    {
      this.lang = localStorage.getItem("lang");
    }
    this.getRegions();
  }

  private setCurrentLocation()
  {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;;
      });
    }
  }
  
  getRegions()
  {
    this.httpClient.get("http://127.0.0.1:8000/api/getRegions")
    .subscribe(
        data => {
            console.log("POST Request is successful ", data);
            this.regions = data['regions'];
            console.log("Data", this.regions[0]['name']);
        },
        error => {
            console.log("Error", error);
        }
    );  
  }


  register()
  {
    this.httpClient.post("http://127.0.0.1:8000/api/register",
    {
      "name" : this.name,
      "email" : this.email,
      "password" : this.password,
      "c_password" : this.confirmPassword,
      "address" : this.addressBySelect,
      "xCordinate" : this.latitude,
      "yCordinate" : this.longitude,
      "typeOfUsers" : this.typeOfUsers,
      "mobileNumber" : this.mobileNumber, 
    })
    .subscribe(
        data => {
            console.log("POST Request is successful ", data);
            this.errorName = [];
            this.errorPhone = [];
            this.errorEmail = [];
            this.errorPassword = [];
            this.errorCPassword = [];
            this.errorAddress = [];
            this.errorCity = [];
            location.assign('/login');
        },
        error => {
          console.log(error);
          this.errorName = error['error']['error']['name'];
          this.errorEmail = error['error']['error']['email'];
          this.errorPhone = error['error']['error']['mobileNumber'];
          this.errorPassword = error['error']['error']['password'];
          this.errorCPassword = error['error']['error']['c_password'];
          this.errorAddress = error['error']['error']['address'];
        }
    );  


  }

}
