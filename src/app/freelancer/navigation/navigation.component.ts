import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {


  latClient;
  lngClient;
  latFreelancer;
  lngFreelancer;

  lab1 = "C";
  lab2 = "W";

  constructor() { }

  ngOnInit() {
    
    this.latClient = Number(localStorage.getItem("latClient"));
    this.lngClient = Number(localStorage.getItem("lngClient"));
    this.latFreelancer = Number(localStorage.getItem("latFreelancer"));
    this.lngFreelancer = Number(localStorage.getItem("lngFreelancer"));
  
/*
    localStorage.removeItem("latClient");
    localStorage.removeItem("lngClient");
    localStorage.removeItem("latFreelancer");
    localStorage.removeItem("lngFreelancer");*/
  }
 

}
