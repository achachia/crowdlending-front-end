import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

import { IdentificationComponent } from './identification/identification.component';
import { ProfilUserComponent } from './profil-user/profil-user.component';
import { AccueilComponent } from './accueil/accueil.component';

import { ProjectAddCompanyOwnerComponent } from './project-add-company-owner/project-add-company-owner.component';
import { ProjectsListCompanyOwnerComponent } from './projects-list-company-owner/projects-list-company-owner.component';
import { ProjectEditCompanyOwnerComponent } from './project-edit-company-owner/project-edit-company-owner.component';
import { ProjectShowCompanyOwnerComponent } from './project-show-company-owner/project-show-company-owner.component';

import { ProjectsListAdminComponent } from './projects-list-admin/projects-list-admin.component';
import { ProjectShowAdminComponent } from './project-show-admin/project-show-admin.component';

import { ProjectListInvestorComponent } from './project-list-investor/project-list-investor.component';
import { ProjectInvestListInvestorComponent } from './project-invest-list-investor/project-invest-list-investor.component';
import { ProjectShowInvestorComponent } from './project-show-investor/project-show-investor.component';



const routes: Routes = [
  { path: '', component: AccueilComponent}, 
  { path: 'Identification', component: IdentificationComponent},
  { path: 'profilUser', component: ProfilUserComponent},
  { path: 'compangy_owner/my_projetcs', component: ProjectsListCompanyOwnerComponent},
  { path: 'compangy_owner/projetcs/add', component: ProjectAddCompanyOwnerComponent},
  { path: 'compangy_owner/my_projetcs/show/:id', component: ProjectShowCompanyOwnerComponent},
  { path: 'compangy_owner/my_projetcs/edit/:id', component: ProjectEditCompanyOwnerComponent},
  { path: 'admin/projetcs', component: ProjectsListAdminComponent},
  { path: 'admin/projetcs/show/:id', component: ProjectShowAdminComponent},
  { path: 'investor/mes_invests', component: ProjectInvestListInvestorComponent},
  { path: 'investor/projetcs', component: ProjectListInvestorComponent},
  { path: 'investor/projetcs/show/:id', component: ProjectShowInvestorComponent}
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
