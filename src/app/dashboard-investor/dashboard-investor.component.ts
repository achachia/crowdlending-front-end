import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-investor',
  templateUrl: './dashboard-investor.component.html',
  styleUrls: ['./dashboard-investor.component.css']
})
export class DashboardInvestorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {  }

  Logout(event){

    this.router.navigate(['/Identification']);
  }

}
