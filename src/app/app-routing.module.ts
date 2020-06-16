import { DashboardAdministratorComponent } from './dashboard-administrator/dashboard-administrator.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';


 
const routes: Routes = [
  { path: 'DashboardAdministrator', component: DashboardAdministratorComponent} 
];
 
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class RoutingModule { }