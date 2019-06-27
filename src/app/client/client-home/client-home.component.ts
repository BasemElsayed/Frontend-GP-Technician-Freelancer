import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-client-home',
  templateUrl: './client-home.component.html',
  styleUrls: ['./client-home.component.css']
})
export class ClientHomeComponent implements OnInit {


  lang = "english";
  
  clientHomeBackground:string = "src/assets/images/slider1.jpg";
  services:any;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {

    if(localStorage.getItem("lang")!=null)
    {
      this.lang = localStorage.getItem("lang");
    }

    this.viewServices();
  }

  viewServices()
  {
    this.httpClient.get("http://127.0.0.1:8000/api/getServices")
    .subscribe(
        data => {
            console.log("POST Request is successful ", data);
            this.services = data['services'];
            //console.log("Data", this.services[0]['name']);
        },
        error => {
            console.log("Error", error);
        }
    );  
  }

  goToFreelancers($serviceName)
  {
    localStorage.setItem("category", $serviceName);
    window.location.href='/available-freelancers';
  }


}
