import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-admin-navbar',
  templateUrl: './admin-navbar.component.html',
  styleUrls: ['./admin-navbar.component.css']
})
export class AdminNavbarComponent implements OnInit {


  token:string;
  
  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    this.token = localStorage.getItem("adminToken");
  }


  logout()
  {
    let headerss = new HttpHeaders({
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + this.token,
  });
  let options = { headers: headerss };

  this.httpClient.get("http://127.0.0.1:8000/api/logoutAPI", options)
  .subscribe(
      data => {
        localStorage.removeItem("adminEmail");
        localStorage.removeItem("adminToken");
        localStorage.removeItem("typeOfUsers");
        window.location.assign('/home')
      },
      error => {
        console.log(error);
        
      }
  );
  }
}
