import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent implements OnInit {

  lang = "english";

  services:any;
  //arrayname:string[];

  constructor(private httpClient:HttpClient) 
  { 

  }

  ngOnInit() 
  {
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


}
