import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { AppComponent } from './app.component';
import { DashboardAdministratorComponent } from './dashboard-administrator/dashboard-administrator.component';
import { IdentificationComponent } from './identification/identification.component';
import { RoutingModule } from './app-routing.module';
import { AccueilComponent } from './accueil/accueil.component';
import { apiHttpJsonService } from './api.json.http.service';
import { DashboardInvestorComponent } from './dashboard-investor/dashboard-investor.component';
import { DashboardCompanyOwnerComponent } from './dashboard-company-owner/dashboard-company-owner.component';
import { ProfilUserComponent } from './profil-user/profil-user.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardAdministratorComponent,
    IdentificationComponent,
    AccueilComponent,
    DashboardInvestorComponent,
    DashboardCompanyOwnerComponent,
    ProfilUserComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule,
    FormsModule,
    HttpClientModule,
    RouterModule
  ],
  providers: [CookieService,apiHttpJsonService],
  bootstrap: [AppComponent]
})
export class AppModule { }
