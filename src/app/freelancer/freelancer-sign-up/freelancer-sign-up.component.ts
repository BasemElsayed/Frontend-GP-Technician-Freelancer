import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common'

@Component({
  selector: 'app-freelancer-sign-up',
  templateUrl: './freelancer-sign-up.component.html',
  styleUrls: ['./freelancer-sign-up.component.css']
})
export class FreelancerSignUpComponent implements OnInit {


  lang = "english";
  
  signUpPhoto:string = "src/assets/images/sections-3.jpg";
  regions:any;
  services:any;
  name:string;
  email:string;
  password:string;
  confirmPassword:string;
  addressBySelect:string;
  latitude:number;
  longitude:number;
  typeOfUsers = 2;
  mobileNumber:string;
  jopTitle:string;


  errorName:string[];
  errorPhone:string[];
  errorEmail:string[];
  errorPassword:string[];
  errorCPassword:string[];
  errorAddress:string[];
  errorCity:string[];
  errorJobTitle:string[];

  constructor(private httpClient: HttpClient, private location: Location) { }

  ngOnInit() {

    if(localStorage.getItem("lang")!=null)
    {
      this.lang = localStorage.getItem("lang");
    }

    this.getRegions();
    this.getServices();
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

  getServices()
  {
    this.httpClient.get("http://127.0.0.1:8000/api/getServices")
    .subscribe(
        data => {
            console.log("POST Request is successful ", data);
            this.services = data['services'];
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
      "jobTitle" : this.jopTitle,
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
            this.errorJobTitle = [];
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
          this.errorJobTitle = error['error']['error']['jobTitle'];
        }
    );  


  }

  
}
