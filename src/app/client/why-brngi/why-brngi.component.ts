import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-why-brngi',
  templateUrl: './why-brngi.component.html',
  styleUrls: ['./why-brngi.component.css']
})
export class WhyBrngiComponent implements OnInit {

  lang = "english";
  
  constructor() { }

  ngOnInit() {
    if(localStorage.getItem("lang")!=null)
    {
      this.lang = localStorage.getItem("lang");
    }
  }

}
