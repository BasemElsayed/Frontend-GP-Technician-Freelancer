import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders  } from '@angular/common/http';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  lang = "english";

  token:string;
  typeOfUser;
  email:string;
  constructor(private httpClient: HttpClient) {
    
  }

  ngOnInit() 
  {
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
              this.email = data['success']['email']
              localStorage.setItem("email", this.email);
          },
          error => {
            console.log(error);
          }
      );

    }
    console.log(this.typeOfUser)

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
        localStorage.removeItem("token");
        localStorage.removeItem("typeOfUsers");
        localStorage.removeItem("clientID");
        localStorage.removeItem("email");
        localStorage.removeItem("clintID");
        localStorage.removeItem("freelancerID");
        localStorage.removeItem("freelancerEmail");

        sessionStorage.removeItem("token");
        sessionStorage.removeItem("typeOfUsers");
        sessionStorage.removeItem("clientID");
        sessionStorage.removeItem("email");
        window.location.assign('/home')
      },
      error => {
        console.log(error);
        
      }
  );
  }


  langEnglish()
  {
    localStorage.setItem("lang", "english");
    window.location.reload();
  }

  langArabic()
  {
    localStorage.setItem("lang", "arabic");
    window.location.reload();
  }


}
