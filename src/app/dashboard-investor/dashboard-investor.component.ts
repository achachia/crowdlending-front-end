import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-dashboard-investor',
  templateUrl: './dashboard-investor.component.html',
  styleUrls: ['./dashboard-investor.component.css']
})
export class DashboardInvestorComponent implements OnInit {  

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
