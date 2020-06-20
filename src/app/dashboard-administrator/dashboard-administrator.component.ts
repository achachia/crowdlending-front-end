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
                      typeCompte : ''
  };

  constructor(private router: Router, private cookie: CookieService) {

    this.infosUser = JSON.parse(this.cookie.get('infosUser'));

    console.log('infosUser', this.infosUser.nom);

  }

  ngOnInit(): void { }


}
