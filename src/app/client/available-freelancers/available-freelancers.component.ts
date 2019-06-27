import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-available-freelancers',
  templateUrl: './available-freelancers.component.html',
  styleUrls: ['./available-freelancers.component.css']
})
export class AvailableFreelancersComponent implements OnInit {


  lang = "english";

  
  category:string;
  token:string;
  email:string;
  freelancers:any;
  latitude:string;
  longitude:string;
  client_id:string;
  allowedToRequest = false;
  searchfirst:boolean;
  freelancerLength = true;
  duplicateRequest;
  requestAtleast = false;
  empty = false;
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    if(localStorage.getItem("lang")!=null)
    {
      this.lang = localStorage.getItem("lang");
    }
    this.category = localStorage.getItem("category");
    this.token = localStorage.getItem("token");
    this.email = localStorage.getItem("email");
    this.getClient();
    this.getFreelancersByGategory();
  }

  getFreelancersByGategory()
  {
    this.searchfirst = true;
    this.freelancerLength = true;
    this.empty = false;
    this.freelancers = [];
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };

    this.httpClient.get("http://127.0.0.1:8000/api/getFreelancersByGategory/" + this.category, options)
    .subscribe(
        data => {
          this.freelancers = data['freelancers'];
          if(this.freelancers.length > 0)
          {
            this.freelancerLength = false;
          }
          else
          {
            this.freelancerLength = false;
            this.empty = true;
          }
        },
        error => {
          this.freelancerLength = true;
          console.log(error);
        }
    );
  }

  getFreelancersByGPS()
  {
    this.searchfirst = false;
    this.freelancerLength = true;
    this.empty = false;
    this.freelancers = [];
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };

    this.httpClient.get("http://127.0.0.1:8000/api/getFreelancersByGPS/" + this.latitude + "/" + this.longitude + "/" + this.category, options)
    .subscribe(
        data => {
          this.freelancers = data['freelancers'];
          if(this.freelancers.length > 0)
          {
            this.freelancerLength = false;
          }
          else
          {
            this.freelancerLength = false;
            this.empty = true;
          }
        },
        error => {
          this.freelancerLength = true;
          console.log(error);
        }
    );
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
          this.latitude = data['client']['xCordinate'];
          this.longitude = data['client']['yCordinate'];
          console.log(this.latitude);
          this.client_id = data['client']['id'];
          this.allowedToRequest = data['client']['allowedToRequest'];
          
        },
        error => {
          console.log(error);
        }
    );
  }


  requestWorker($freelancer_id)
  {
    if(this.allowedToRequest == true)
    {
      let headerss = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.token,
      });
      let options = { headers: headerss };
      
      this.httpClient.post("http://127.0.0.1:8000/api/requestWorker",
      {
        "client_id" : this.client_id,
        "freelancer_id" : $freelancer_id,
        "status" : 3,
      }, options)
      .subscribe(
          data => {
              console.log("POST Request is successful ", data);
              this.duplicateRequest = 0;
              this.requestAtleast = true;
          },
          error => {
            console.log(error);
            this.requestAtleast = true;
            this.duplicateRequest = error['error']['error'];
          }
      );
    }
  }


  getFreelancerID($id, $email)
  {
    localStorage.setItem("freelancerID", $id);
    localStorage.setItem("freelancerEmail", $email);
  }
  
}
