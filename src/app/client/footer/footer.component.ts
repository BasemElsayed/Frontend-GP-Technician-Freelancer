import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  lang = "english";
  
  token:string;
  typeOfUser;

  constructor(private httpClient: HttpClient) { }

  ngOnInit() {
    if(localStorage.getItem("lang")!=null)
    {
      this.lang = localStorage.getItem("lang");
    }

    this.typeOfUser = 0;
    if(localStorage.getItem("token")!= null)
    {
      this.typeOfUser = localStorage.getItem('typeOfUsers');
      this.token = localStorage.getItem("token");
      let headerss = new HttpHeaders({
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + this.token,
      });
      let options = { headers: headerss };

      this.httpClient.get("http://127.0.0.1:8000/api/details", options)
      .subscribe(
          data => {
              this.typeOfUser = data['success']['typeOfUsers']
          },
          error => {
            console.log(error);
          }
      );

    }
  }

}
