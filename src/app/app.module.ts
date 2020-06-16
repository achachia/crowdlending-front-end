import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DashboardAdministratorComponent } from './dashboard-administrator/dashboard-administrator.component';
import { RoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    DashboardAdministratorComponent
  ],
  imports: [
    BrowserModule,
    RoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
