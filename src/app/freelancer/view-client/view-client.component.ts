import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css']
})
export class ViewClientComponent implements OnInit {


  clientID:string;
  token:string;

  email:string;
  name:string;
  mobileNumber:string;
  address:string;
  xCordinate:number;
  yCordinate:number;
  numberOfJobsDone:string;
  personalImage:string;
  totalRate:string;

  comments:any;
  portfolios:any;
  empty = false;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.clientID = localStorage.getItem("clintID");
    this.token = localStorage.getItem("token");
    this.getClient();
    this.getClientComments();
  }

  
  getClient()
  {
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };

    this.httpClient.get("http://127.0.0.1:8000/api/getClientByID/" + this.clientID, options)
    .subscribe(
        data => {
          this.email = data['client']['email'];
          this.name = data['client']['name'];
          this.mobileNumber = data['client']['mobileNumber'];
          this.address = data['client']['address'];
          this.xCordinate = data['client']['xCordinate'];
          this.yCordinate = data['client']['yCordinate'];
          this.numberOfJobsDone = data['client']['numberOfJobsDone'];
          this.personalImage = data['client']['personalImage'];
          this.totalRate = data['client']['totalRate'];
          console.log(data)
        },
        error => {
          console.log(error);
        }
    );
  }


  getClientComments()
  {
    this.empty = false;
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    console.log("Client Id : " + this.clientID)
    this.httpClient.get("http://127.0.0.1:8000/api/getClientCommentsByID/" + this.clientID, options)
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


}
