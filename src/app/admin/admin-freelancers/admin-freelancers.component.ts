import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-freelancers',
  templateUrl: './admin-freelancers.component.html',
  styleUrls: ['./admin-freelancers.component.css']
})
export class AdminFreelancersComponent implements OnInit {

  token:string;
  freelancers:any;

  constructor(private httpClient: HttpClient) { }

  ngOnInit()
  {
    this.token = localStorage.getItem("adminToken");
    this.viewFreelancers();
  }


  viewFreelancers()
  {
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    this.httpClient.get("http://127.0.0.1:8000/api/viewFreelancers", options)
    .subscribe(
        data => {
            console.log("POST Request is successful ", data);
            this.freelancers = data['freelancers'];
            //console.log("Data", this.services[0]['name']);
        },
        error => {
            console.log("Error", error);
        }
    );  
  }

  approve($id)
  {
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    this.httpClient.get("http://127.0.0.1:8000/api/approveFreelancer/" + $id, options)
    .subscribe(
        data => {
          this.viewFreelancers();
        },
        error => {
            console.log("Error", error);
        }
    );  
  }

  block($id)
  {
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    this.httpClient.get("http://127.0.0.1:8000/api/blockFreelancer/" + $id, options)
    .subscribe(
        data => {
          this.viewFreelancers();
        },
        error => {
            console.log("Error", error);
        }
    );  
  }

}
