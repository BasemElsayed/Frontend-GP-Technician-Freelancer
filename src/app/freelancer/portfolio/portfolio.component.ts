import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css']
})
export class PortfolioComponent implements OnInit {


  lang = "english";
  
  token:string;
  id:string;
  email:string;
  file;
  portfolios:any;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    if(localStorage.getItem("lang")!=null)
    {
      this.lang = localStorage.getItem("lang");
    }
    this.id = localStorage.getItem("clientID");
    this.email = localStorage.getItem("email");
    this.token = localStorage.getItem("token");
    this.getPortfolio();
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
    input.append('portfolioImage', this.file);
    input.append('freelancer_id', this.id);
    
    this.httpClient.post("http://127.0.0.1:8000/api/updatePortfolio" , input, options)
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


  getPortfolio()
  {
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };

    this.httpClient.get("http://127.0.0.1:8000/api/viewAllPortfolio/" + this.id, options)
    .subscribe(
        data => {
          this.portfolios = data['freelancerPortfolio'];
          
        },
        error => {
          console.log(error);
        }
    );
  }

  deletePortfolio($id)
  {
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };

    this.httpClient.get("http://127.0.0.1:8000/api/deletePortfolio/" + $id, options)
    .subscribe(
        data => {
          window.location.reload();
        },
        error => {
          console.log(error);
        }
    );
  }


  
}
