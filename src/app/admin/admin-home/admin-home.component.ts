import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {


  token:string;
  statistics:any;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.token = localStorage.getItem("adminToken");
    this.viewStatistics();
  }

  viewStatistics()
  {
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    this.httpClient.get("http://127.0.0.1:8000/api/viewStatistics", options)
    .subscribe(
        data => {
            console.log("POST Request is successful ", data);
            this.statistics = data['services'];
            //console.log("Data", this.services[0]['name']);
        },
        error => {
            console.log("Error", error);
        }
    );  
  }

  
}
