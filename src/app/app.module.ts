import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { RoutingModule } from './app-routing.module';

import { MaterialModule } from './material/material.module';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { apiHttpJsonService } from './api.json.http.service';
import { ImageService } from './image.service';
import { NgxUiLoaderModule } from 'ngx-ui-loader';


import { AppComponent } from './app.component';
import { AccueilComponent } from './accueil/accueil.component';
import { IdentificationComponent } from './identification/identification.component';
import { ProfilUserComponent } from './profil-user/profil-user.component';

import { ProjectAddCompanyOwnerComponent } from './project-add-company-owner/project-add-company-owner.component';
import { ProjectsListCompanyOwnerComponent } from './projects-list-company-owner/projects-list-company-owner.component';
import { ProjectEditCompanyOwnerComponent } from './project-edit-company-owner/project-edit-company-owner.component';
import { ProjectShowCompanyOwnerComponent } from './project-show-company-owner/project-show-company-owner.component';

import { ProjectListInvestorComponent } from './project-list-investor/project-list-investor.component';
import { ProjectInvestListInvestorComponent } from './project-invest-list-investor/project-invest-list-investor.component';
import { ProjectShowInvestorComponent } from './project-show-investor/project-show-investor.component';

import { ProjectsListAdminComponent } from './projects-list-admin/projects-list-admin.component';
import { ProjectShowAdminComponent } from './project-show-admin/project-show-admin.component';

import { NavTemplatesCompantOwnerComponent } from './templates/company_owner/nav-templates/nav-templates.component';
import { SideBarLeftTemplatesCompantOwnerComponent } from './templates/company_owner/side-bar-left-templates/side-bar-left-templates.component';
import { FooterTemplatesCompantOwnerComponent } from './templates/company_owner/footer-templates/footer-templates.component';

import { NavTemplatesInvestorComponent } from './templates/investor/nav-templates/nav-templates.component';
import { SideBarLeftTemplatesInvestorComponent } from './templates/investor/side-bar-left-templates/side-bar-left-templates.component';
import { FooterTemplatesInvestorComponent } from './templates/investor/footer-templates/footer-templates.component';

import { NavTemplatesAdministratorComponent } from './templates/administrator/nav-templates/nav-templates.component';
import { SideBarLeftTemplatesAdministratorComponent } from './templates/administrator/side-bar-left-templates/side-bar-left-templates.component';
import { FooterTemplatesAdministratorComponent } from './templates/administrator/footer-templates/footer-templates.component';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { NgxPayPalModule } from 'ngx-paypal';

import { MatDateFormats, MAT_DATE_LOCALE, MAT_DATE_FORMATS } from '@angular/material/core';






export const MY_FORMAT: MatDateFormats = {
                                        parse: {
                                                dateInput: 'DD/MM/YYYY',
                                               },
                                        display: {
                                                dateInput: 'DD/MM/YYYY',
                                                monthYearLabel: 'MMM YYYY',
                                                dateA11yLabel: 'DD/MM/YYYY',
                                                monthYearA11yLabel: 'MMMM YYYY',
                                         },
                                  };



@NgModule({
  declarations: [
    AppComponent,
    IdentificationComponent,
    AccueilComponent, 
    ProfilUserComponent,
    ProjectAddCompanyOwnerComponent,
    ProjectsListCompanyOwnerComponent,
    ProjectEditCompanyOwnerComponent,
    ProjectShowCompanyOwnerComponent,
    NavTemplatesInvestorComponent,
    SideBarLeftTemplatesInvestorComponent,
    FooterTemplatesInvestorComponent,
    NavTemplatesCompantOwnerComponent,
    SideBarLeftTemplatesCompantOwnerComponent,
    FooterTemplatesCompantOwnerComponent,
    NavTemplatesAdministratorComponent,
    SideBarLeftTemplatesAdministratorComponent,
    FooterTemplatesAdministratorComponent,
    ProjectsListAdminComponent,
    ProjectShowAdminComponent,
    ProjectListInvestorComponent,
    ProjectInvestListInvestorComponent,
    ProjectShowInvestorComponent,

  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule,
    MaterialModule,
    NoopAnimationsModule,
    BrowserAnimationsModule,
    NgxUiLoaderModule,
    NgbModule,
    NgxPayPalModule
  
    

  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  providers: [CookieService, apiHttpJsonService,ImageService,DatePipe,
             { provide: MAT_DATE_LOCALE, useValue: 'fr-FR' },
             { provide: MAT_DATE_FORMATS, useValue: MY_FORMAT }
             ],
  bootstrap: [AppComponent]
})
export class AppModule { }
