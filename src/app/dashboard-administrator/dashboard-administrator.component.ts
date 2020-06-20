import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-dashboard-administrator',
  templateUrl: './dashboard-administrator.component.html',
  styleUrls: ['./dashboard-administrator.component.css']
})
export class DashboardAdministratorComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void { }
 

}
