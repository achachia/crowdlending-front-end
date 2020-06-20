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
                     typeCompte : ''
  };

  constructor(private router: Router, private cookie: CookieService) {

    this.infosUser = JSON.parse(this.cookie.get('infosUser'));
   }

  ngOnInit(): void {  }

  

}
