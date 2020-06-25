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



const routes: Routes = [
  { path: '', component: AccueilComponent}, 
  { path: 'Identification', component: IdentificationComponent},
  { path: 'profilUser', component: ProfilUserComponent},
  { path: 'compangy_owner/projetcs', component: ProjectsListCompanyOwnerComponent},
  { path: 'compangy_owner/projetcs/add', component: ProjectAddCompanyOwnerComponent},
  { path: 'compangy_owner/projetc/:id', component: ProjectShowCompanyOwnerComponent},
  { path: 'compangy_owner/projetc/:id/edit', component: ProjectEditCompanyOwnerComponent}
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
