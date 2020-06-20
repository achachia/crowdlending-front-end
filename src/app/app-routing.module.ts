import { DashboardAdministratorComponent } from './dashboard-administrator/dashboard-administrator.component';
import { DashboardInvestorComponent } from './dashboard-investor/dashboard-investor.component';
import { DashboardCompanyOwnerComponent } from './dashboard-company-owner/dashboard-company-owner.component';
import { IdentificationComponent } from './identification/identification.component';
import { ProfilUserComponent } from './profil-user/profil-user.component';
import { AccueilComponent } from './accueil/accueil.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';



const routes: Routes = [
  { path: '', component: AccueilComponent},
  { path: 'DashboardAdministrator', component: DashboardAdministratorComponent},
  { path: 'DashboardInvestor', component: DashboardInvestorComponent},
  { path: 'DashboardCompanyOwner', component: DashboardCompanyOwnerComponent},
  { path: 'Identification', component: IdentificationComponent},
  { path: 'profilUser', component: ProfilUserComponent}
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