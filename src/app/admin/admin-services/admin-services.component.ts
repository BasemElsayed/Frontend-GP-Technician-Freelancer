import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-services',
  templateUrl: './admin-services.component.html',
  styleUrls: ['./admin-services.component.css']
})
export class AdminServicesComponent implements OnInit {

  token:string;
  services:any;


  serviceID:string;
  serviceName:string;
  serviceIcon:string;
  serviceDescrption:string;

  file;


  nameError = [];
  descriptionError = [];
  iconError;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.token = localStorage.getItem("adminToken");
    this.viewServices();
  }

  viewServices()
  {
    this.httpClient.get("http://127.0.0.1:8000/api/getServices")
    .subscribe(
        data => {
            console.log("POST Request is successful ", data);
            this.services = data['services'];
            //console.log("Data", this.services[0]['name']);
        },
        error => {
            console.log("Error", error);
        }
    );  
  }

  getServiceID($id)
  {
    this.descriptionError = [];
    this.nameError = [];
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    this.httpClient.get("http://127.0.0.1:8000/api/getServiceByID/" + $id, options)
    .subscribe(
        data => {
          this.serviceID = data['service'][0]['id'];
          this.serviceName = data['service'][0]['name'];
          this.serviceIcon = data['service'][0]['serviceIcon'];
          this.serviceDescrption = data['service'][0]['description'];
        },
        error => {
            console.log("Error", error);
        }
    );
  }


  editService()
  {
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    this.httpClient.post("http://127.0.0.1:8000/api/editService/" + this.serviceID, {
      "name" : this.serviceName,
      "description" : this.serviceDescrption,
    }, options)
    .subscribe(
        data => {
          window.location.reload();
          this.nameError = [];
          this.descriptionError = [];
        },
        error => {
            console.log("Error", error);
            this.nameError = error['error']['name'];
            this.descriptionError = error['error']['description'];
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
    input.append('serviceIcon', this.file);
    
    this.httpClient.post("http://127.0.0.1:8000/api/updateServiceIcon/" + this.serviceID, input, options)
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

  beforeInsert()
  {
    this.serviceID = "";
    this.serviceName = "";
    this.serviceDescrption = "";
    this.serviceIcon = "";
  }

  onFileChanges2(event)
  {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
       this.file = event.target.files[0];
    }
  }

  addService()
  {
    this.iconError;
    this.nameError = [];
    this.descriptionError = [];
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    let input = new FormData();
    input.append('serviceIcon', this.file);
    input.append('name', this.serviceName);
    input.append('description', this.serviceDescrption);
    
    this.httpClient.post("http://127.0.0.1:8000/api/addService", input, options)
    .subscribe(
        data => {
          console.log(data);
          window.location.reload();
        },
        error => {
          console.log(error);
          this.iconError = error['error']['serviceIcon'];
          this.nameError = error['error']['error']['name'];
          this.descriptionError = error['error']['error']['description'];
          
        }
    );
  }


  deleteService($id)
  {
    this.descriptionError = [];
    this.nameError = [];
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    this.httpClient.get("http://127.0.0.1:8000/api/deleteService/" + $id, options)
    .subscribe(
        data => {
          window.location.reload();
        },
        error => {
            console.log("Error", error);
        }
    );
  }

}
