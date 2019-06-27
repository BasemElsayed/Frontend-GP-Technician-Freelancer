import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.css']
})
export class ClientProfileComponent implements OnInit {
  
  regions;
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
  empty = false;
  file;
  totalRate;
  
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
    this.getClient();
    this.getRegions();
    this.getClientComments();
  }

  getClient()
  {
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };

    this.httpClient.get("http://127.0.0.1:8000/api/getClient/" + this.email, options)
    .subscribe(
        data => {
          this.id = data['client']['id'];
          this.email = data['client']['email'];
          this.name = data['client']['name'];
          this.mobileNumber = data['client']['mobileNumber'];
          this.address = data['client']['address'];
          this.xCordinate = data['client']['xCordinate'];
          this.yCordinate = data['client']['yCordinate'];
          this.numberOfJobsDone = data['client']['numberOfJobsDone'];
          this.typeOfUsers = data['client']['typeOfUsers'];
          this.personalImage = data['client']['personalImage'];
          this.totalRate = data['client']['totalRate'];
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

  private setCurrentLocation()
  {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.xCordinate = position.coords.latitude;
        this.yCordinate = position.coords.longitude;
      });
    }
    
  }
  


  getClientComments()
  {
    this.empty = false;
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };

    this.httpClient.get("http://127.0.0.1:8000/api/getComments/" + this.email, options)
    .subscribe(
        data => {
          this.comments = data['comments'];
          console.log(data)
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
    }, options)
    .subscribe(
        data => {
          console.log(data);
          this.errorName = [];
          this.errorEmail = [];
          this.errorPassword = [];
          this.errorCPassword = [];
          this.errorPhone = [];
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
