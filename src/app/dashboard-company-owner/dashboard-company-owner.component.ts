import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard-company-owner',
  templateUrl: './dashboard-company-owner.component.html',
  styleUrls: ['./dashboard-company-owner.component.css']
})
export class DashboardCompanyOwnerComponent implements OnInit {

  public infosUser = {
                     id : '',
                     nom: '',
                     prenom : '',
                     login : '',
                     password : '',
                     sex : '',
                     photoUser : '',
                     typeCompte : ''
  };

  constructor(private router: Router, private cookie: CookieService) {

    this.infosUser = JSON.parse(this.cookie.get('infosUser'));

    if (this.infosUser.photoUser === ''){

      if (this.infosUser.sex === 'F') {

        this.infosUser.photoUser = './assets/img/users/user_f.png';
      }

      if (this.infosUser.sex === 'M') {

        this.infosUser.photoUser = './assets/img/users/user_m.png';
        }

    }
   }

  ngOnInit(): void {  }

  

}
