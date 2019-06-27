import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-regions',
  templateUrl: './admin-regions.component.html',
  styleUrls: ['./admin-regions.component.css']
})
export class AdminRegionsComponent implements OnInit {

  token:string;
  regions:any;

  regionName:string;

  nameError = [];
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.token = localStorage.getItem("adminToken");
    this.getRegions();
  }

  getRegions()
  {
    this.httpClient.get("http://127.0.0.1:8000/api/getRegions")
    .subscribe(
        data => {
            console.log("POST Request is successful ", data);
            this.regions = data['regions'];
        },
        error => {
            console.log("Error", error);
        }
    );  
  }


  deleteRegion($id)
  {
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    this.httpClient.get("http://127.0.0.1:8000/api/deleteRegion/" + $id, options)
    .subscribe(
        data => {
          this.getRegions();
        },
        error => {
            console.log("Error", error);
        }
    );
  }

  addRegion()
  {
    let headerss = new HttpHeaders({
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.token,
    });
    let options = { headers: headerss };
    this.httpClient.post("http://127.0.0.1:8000/api/addRegion", {
      'name': this.regionName,
    }, options)
    .subscribe(
        data => {
         this.getRegions();
         this.nameError = [];
        },
        error => {
            console.log("Error", error);
            this.nameError = error['error']['error']['name'];
        }
    );
  }


  

}
