import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-view-freelancer',
  templateUrl: './view-freelancer.component.html',
  styleUrls: ['./view-freelancer.component.css']
})
export class ViewFreelancerComponent implements OnInit {

  freelancerID:string;
  token:string;

  email:string;
  name:string;
  mobileNumber:string;
  address:string;
  xCordinate:number;
  yCordinate:number;
  numberOfJobsDone:string;
  personalImage:string;
  jobTitle:string;
  totalRate:string;

  comments:any;
  portfolios:any;
  empty = false;
  empty2 = false;
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {

    this.freelancerID = localStorage.getItem("freelancerID");
    this.email = localStorage.getItem("freelancerEmail");
    this.token = localStorage.getItem("token");
    this.getFreelancer();
    this.getFreelancerComments();
    this.getPortfolio();
  }

  getFreelancer()
  {
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };

    this.httpClient.get("http://127.0.0.1:8000/api/getFreelancerByID/" + this.freelancerID, options)
    .subscribe(
        data => {
          this.email = data['freelancer']['email'];
          this.name = data['freelancer']['name'];
          this.mobileNumber = data['freelancer']['mobileNumber'];
          this.address = data['freelancer']['address'];
          this.xCordinate = data['freelancer']['xCordinate'];
          this.yCordinate = data['freelancer']['yCordinate'];
          this.numberOfJobsDone = data['freelancer']['numberOfJobsDone'];
          this.personalImage = data['freelancer']['personalImage'];
          this.jobTitle = data['freelancer']['jobTitle'];
          this.totalRate = data['freelancer']['totalRate'];
          console.log(data)
        },
        error => {
          console.log(error);
        }
    );
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
          console.log(data)
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


  getPortfolio()
  {
    this.empty2 = false;
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };

    this.httpClient.get("http://127.0.0.1:8000/api/viewAllPortfolio/" + this.freelancerID, options)
    .subscribe(
        data => {
          this.portfolios = data['freelancerPortfolio'];
          if(this.portfolios.length == 0)
          {
            this.empty2 = true;
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  

}
