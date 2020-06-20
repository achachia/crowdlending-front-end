import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-company-owner',
  templateUrl: './dashboard-company-owner.component.html',
  styleUrls: ['./dashboard-company-owner.component.css']
})
export class DashboardCompanyOwnerComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {  }

  Logout(event){

    this.router.navigate(['/Identification']);
  }

}
