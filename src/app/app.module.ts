import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardAdministratorComponent } from './dashboard-administrator/dashboard-administrator.component';
import { IdentificationComponent } from './identification/identification.component';
import { RoutingModule } from './app-routing.module';
import { AccueilComponent } from './accueil/accueil.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardAdministratorComponent,
    IdentificationComponent,
    AccueilComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
