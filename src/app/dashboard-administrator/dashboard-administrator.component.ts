import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard-administrator',
  templateUrl: './dashboard-administrator.component.html',
  styleUrls: ['./dashboard-administrator.component.css']
})
export class DashboardAdministratorComponent implements OnInit {

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

    console.log('infosUser', this.infosUser.nom);

  }

  ngOnInit(): void { }


}
