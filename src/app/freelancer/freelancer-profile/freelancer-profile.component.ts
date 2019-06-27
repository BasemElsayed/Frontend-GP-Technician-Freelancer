import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-freelancer-profile',
  templateUrl: './freelancer-profile.component.html',
  styleUrls: ['./freelancer-profile.component.css']
})
export class FreelancerProfileComponent implements OnInit {

  regions;
  services;
  comments;
  token:string;

  id:string;
  email:string;
  name:string;
  mobileNumber:string;
  address:string;
  xCordinate:number;
  yCordinate:number;
  numberOfJobsDone:string;
  typeOfUsers:string;
  personalImage:string;
  password:string;
  c_password:string;
  jobTitle:string;
  allowedByAdmin:string;
  empty = false;
  file;

  errorName;
  errorEmail;
  errorPhone;
  errorPassword;
  errorCPassword;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() 
  {
    this.email = localStorage.getItem("email");
    this.token = localStorage.getItem("token");
    this.getFreelancer();
    this.getRegions();
    this.getServices();
    this.getFreelancerComments();
  }

  getFreelancer()
  {
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };

    this.httpClient.get("http://127.0.0.1:8000/api/getFreelancer/" + this.email, options)
    .subscribe(
        data => {
          this.id = data['freelancer']['id'];
          this.email = data['freelancer']['email'];
          this.name = data['freelancer']['name'];
          this.mobileNumber = data['freelancer']['mobileNumber'];
          this.address = data['freelancer']['address'];
          this.xCordinate = data['freelancer']['xCordinate'];
          this.yCordinate = data['freelancer']['yCordinate'];
          this.numberOfJobsDone = data['freelancer']['numberOfJobsDone'];
          this.typeOfUsers = data['freelancer']['typeOfUsers'];
          this.personalImage = data['freelancer']['personalImage'];
          this.jobTitle = data['freelancer']['jobTitle'];
          this.allowedByAdmin = data['freelancer']['allowedByAdmin'];
          console.log(data)
        },
        error => {
          console.log(error);
        }
    );
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

  private setCurrentLocation()
  {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.xCordinate = position.coords.latitude;
        this.yCordinate = position.coords.longitude;
      });
    }
    
  }
  


  getFreelancerComments()
  {
    this.empty = false;
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };

    this.httpClient.get("http://127.0.0.1:8000/api/getFrelancersComments/" + this.email, options)
    .subscribe(
        data => {
          this.comments = data['comments'];
          if(this.comments.length == 0)
          {
            this.empty = true;
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  
  editProfile()
  {
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    
    this.httpClient.post("http://127.0.0.1:8000/api/edit/" + this.id, {
      "name" : this.name,
      "email" : this.email,
      "password" : this.password,
      "c_password" : this.c_password,
      "mobileNumber" : this.mobileNumber,
      "address" : this.address,
      "xCordinate" : this.xCordinate,
      "yCordinate" : this.yCordinate,
      "numberOfJobsDone" : this.numberOfJobsDone,
      "typeOfUsers" : this.typeOfUsers,
      "jobTitle" : this.jobTitle,
    }, options)
    .subscribe(
        data => {
          console.log(data);
          this.errorName = [];
          this.errorEmail = [];
          this.errorPassword = [];
          this.errorCPassword = [];
          this.errorPhone = [];
          localStorage.setItem("email", this.email);
          window.location.reload();
        },
        error => {
          console.log(error);
          this.errorName = error['error']['name'];
          this.errorEmail = error['error']['email'];
          this.errorPassword = error['error']['password'];
          this.errorCPassword = error['error']['c_password'];
          this.errorPhone = error['error']['mobileNumber'];
        }
    );
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
       this.file = event.target.files[0];
    }

    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    let input = new FormData();
    input.append('typeOfUsers', this.typeOfUsers);
    input.append('personalImage', this.file);
    
    this.httpClient.post("http://127.0.0.1:8000/api/uploadPhoto/" + this.id, input, options)
    .subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        error => {
          console.log(error);
        }
    );
    
  }

}
