import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-client-requests',
  templateUrl: './client-requests.component.html',
  styleUrls: ['./client-requests.component.css']
})
export class ClientRequestsComponent implements OnInit {

    lang = "english";

  searchfirst = 1;
  token:string;
  email:string;
  clientID:string;
  finishedRequests:any;
  requstID;
  requstsLength = false;
  empty = false;
  comment = false;



  id:string;
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
  totalRate;
  allowedToRequest;

  review:string;
  freelancerID:string;
  commentError;

  constructor(private httpClient:HttpClient) { }

  ngOnInit() {
    if(localStorage.getItem("lang")!=null)
    {
      this.lang = localStorage.getItem("lang");
    }
    this.token = localStorage.getItem("token");
    this.email = localStorage.getItem("email");
    this.clientID = localStorage.getItem("clientID");
    this.getFinishedRequests();
    this.getClient();
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
          this.allowedToRequest = data['client']['allowedToRequest'];
          if(this.allowedToRequest == 0)
          {
              this.getFinishedRequestsNeedsRate();
          }
        },
        error => {
          console.log(error);
        }
    );
  }

  getFinishedRequests()
  {
    this.searchfirst = 2;
    this.requstsLength = false;
    this.empty = false;
    this.finishedRequests = [];
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    this.httpClient.get("http://127.0.0.1:8000/api/getFinishedRequests/" + this.clientID, options)
    .subscribe(
        data => {
            console.log("POST Request is successful ", data);
            this.finishedRequests = data['requsts'];
            if(this.finishedRequests.length > 0)
            {
                this.requstsLength = true;
                this.empty = false;
            }
            else
            {
                this.requstsLength = true;
                this.empty = true;
            }
        },
        error => {
            console.log("Error", error);
        }
    );
  }

  getUnfinishedRequests()
  {
    this.requstsLength = false;
    this.empty = false;
    this.searchfirst = 1;
    this.finishedRequests = [];
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    this.httpClient.get("http://127.0.0.1:8000/api/getUnfinishedRequests/" + this.clientID, options)
    .subscribe(
        data => {
            console.log("POST Request is successful ", data);
            this.finishedRequests = data['requsts'];
            if(this.finishedRequests.length > 0)
            {
                this.requstsLength = true;
                this.empty = false;
            }
            else
            {
                this.requstsLength = true;
                this.empty = true;
            }
        },
        error => {
            console.log("Error", error);
        }
    );
  }

  getCancelledRequests()
  {
    this.requstsLength = false;
    this.empty = false;
    this.searchfirst = 0;
    this.finishedRequests = [];
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    this.httpClient.get("http://127.0.0.1:8000/api/getCancelledRequests/" + this.clientID, options)
    .subscribe(
        data => {
            console.log("POST Request is successful ", data);
            this.finishedRequests = data['requsts'];
            if(this.finishedRequests.length > 0)
            {
                this.requstsLength = true;
                this.empty = false;
            }
            else
            {
                this.requstsLength = true;
                this.empty = true;
            }
        },
        error => {
            console.log("Error", error);
        }
    );
  }


  getWaitingRequests()
  {
    this.requstsLength = false;
    this.empty = false;
    this.searchfirst = 3;
    this.finishedRequests = [];
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    this.httpClient.get("http://127.0.0.1:8000/api/getWaitingRequests/" + this.clientID, options)
    .subscribe(
        data => {
            console.log("POST Request is successful ", data);
            this.finishedRequests = data['requsts'];
            if(this.finishedRequests.length > 0)
            {
                this.requstsLength = true;
                this.empty = false;
            }
            else
            {
                this.requstsLength = true;
                this.empty = true;
            }
        },
        error => {
            console.log("Error", error);
        }
    );
  }

  getRequestID($id, $freelancer_id)
  {
    this.requstID = $id;
    this.freelancerID = $freelancer_id;
  }

  rateWorker($rate)
  {
    this.comment = false;
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    this.httpClient.get("http://127.0.0.1:8000/api/updateRate/" + this.requstID + "/" + $rate, options)
    .subscribe(
        data => {
            console.log("POST Request is successful ", data);
            this.getFinishedRequests();
            this.comment = true;
        },
        error => {
            console.log("Error", error);
        }
    );
  }

  addComment()
  {
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    this.httpClient.post("http://127.0.0.1:8000/api/addComment",
    {
        "client_id" : this.clientID,
        "freelancer_id" : this.freelancerID,
        "description" : this.review,
        "typeOfUsers" : 2,

    }, options)
    .subscribe(
        data => {
            console.log("POST Request is successful ", data);
            window.location.reload();
        },
        error => {
            console.log("Error", error);
            this.commentError = error['error']['error']['description'];
        }
    );
  }

  cancelRequest($id)
  {
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    this.httpClient.get("http://127.0.0.1:8000/api/cancelRequest/" + $id, options)
    .subscribe(
        data => {
            console.log("POST Request is successful ", data);
            this.getWaitingRequests();
        },
        error => {
            console.log("Error", error);
        }
    );
  }

  reloadPage()
  {
      window.location.reload();
  }



  getFinishedRequestsNeedsRate()
  {
    this.requstsLength = false;
    this.empty = false;
    this.finishedRequests = [];
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    this.httpClient.get("http://127.0.0.1:8000/api/showFinishedRequestsNeedsRateClientVersion/" + this.id, options)
    .subscribe(
        data => {
            console.log("POST Request is successful ", data);
            this.finishedRequests = data['requsts'];
            if(this.finishedRequests.length > 0)
            {
                this.requstsLength = true;
                this.empty = false;
            }
            else
            {
                this.requstsLength = true;
                this.empty = true;
            }
        },
        error => {
            console.log("Error", error);
        }
    );
  }


}
