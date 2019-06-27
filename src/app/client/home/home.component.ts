import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  lang = "english";

  slider1:string = "src/assets/images/slider1.jpg";
  slider2:string = "src/assets/images/slider2.jpg";
  slider3:string = "src/assets/images/slider3.jpg";
  slider4:string = "src/assets/images/slider4.jpg";
  constructor() { }

  ngOnInit() {
    if(localStorage.getItem("lang")!=null)
    {
      this.lang = localStorage.getItem("lang");
    }
  }

}
