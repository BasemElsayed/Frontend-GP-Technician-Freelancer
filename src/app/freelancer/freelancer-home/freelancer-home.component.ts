import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-freelancer-home',
  templateUrl: './freelancer-home.component.html',
  styleUrls: ['./freelancer-home.component.css']
})
export class FreelancerHomeComponent implements OnInit {




    lang = "english";

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
  allowedToRequest = 1;
  limitNumberOfWorks=1;

  requstID;
  clientID:string;
  review:string;
  commentError;

  finishedRequests:any;
  requstsLength = false;
  empty = false;
  comment = false;
  loadingFirst = true;
  searchfirst = 3;
  
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    if(localStorage.getItem("lang")!=null)
    {
      this.lang = localStorage.getItem("lang");
    }
    this.email = localStorage.getItem("email");
    this.token = localStorage.getItem("token");
    this.id = localStorage.getItem("clientID");
    this.getFreelancer();
    this.getWaitingRequests();
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
          this.allowedToRequest = data['freelancer']['allowedToRequest'];
          this.limitNumberOfWorks = data['freelancer']['limitNumberOfWorks'];
          if(this.allowedToRequest == 0)
          {
              this.getFinishedRequestsNeedsRate();
          }
          this.loadingFirst = false;
        },
        error => {
          console.log(error);
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
    this.httpClient.get("http://127.0.0.1:8000/api/getWaitingRequestsFreelancer/" + this.id, options)
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

  acceptRequest($requestId)
  {
    
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    
    this.httpClient.post("http://127.0.0.1:8000/api/updateRequest/" + $requestId, {
      "status" : 1,
    }, options)
    .subscribe(
        data => {
            this.searchfirst = 1;
            window.location.reload();
        },
        error => {
          console.log(error);
        }
    );
  }
  
  cancelRequest($requestId)
  {
    
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    
    this.httpClient.post("http://127.0.0.1:8000/api/updateRequest/" + $requestId, {
      "status" : 0,
    }, options)
    .subscribe(
        data => {
          window.location.reload();
        },
        error => {
          console.log(error);
        }
    );
  }
  
  

  finishRequest($requestId)
  {
    
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    
    this.httpClient.post("http://127.0.0.1:8000/api/updateRequest/" + $requestId, {
      "status" : 2,
    }, options)
    .subscribe(
        data => {
            this.searchfirst = 2;
          window.location.reload();
        },
        error => {
          console.log(error);
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
    this.httpClient.get("http://127.0.0.1:8000/api/showAcceptingRequestsFreelancer/" + this.id, options)
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


  getFinishedRequests()
  {
    this.requstsLength = false;
    this.empty = false;
    this.searchfirst = 2;
    this.finishedRequests = [];
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    this.httpClient.get("http://127.0.0.1:8000/api/showFinishedRequestsFreelancer/" + this.id, options)
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

  getFinishedRequestsNeedsRate()
  {
    this.requstsLength = false;
    this.empty = false;
    this.searchfirst = 2;
    this.finishedRequests = [];
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    this.httpClient.get("http://127.0.0.1:8000/api/showFinishedRequestsNeedsRate/" + this.id, options)
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



  getRequestID($id, $client_id)
  {
    this.requstID = $id;
    this.clientID = $client_id;
  }

  rateClient($rate)
  {
    this.comment = false;
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    this.httpClient.get("http://127.0.0.1:8000/api/updateRateFreelancer/" + this.requstID + "/" + $rate, options)
    .subscribe(
        data => {
            console.log("POST Request is successful ", data);
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
        "freelancer_id" : this.id,
        "description" : this.review,
        "typeOfUsers" : 1,

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

  skipReload()
  {
    window.location.reload();
  }


  getClientID($id)
  {
    localStorage.setItem("clintID", $id);
  }


  getClientPoints($xCordinate, $yCordinate)
  {
      localStorage.setItem("latClient", $xCordinate);
      localStorage.setItem("lngClient", $yCordinate);
      localStorage.setItem("latFreelancer", this.xCordinate.toString());
      localStorage.setItem("lngFreelancer", this.yCordinate.toString());
      //[routerLink]="['/freelancer-navigation']" 
      window.location.assign('/freelancer-navigation');
  }
}
