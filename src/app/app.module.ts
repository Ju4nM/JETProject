import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UsersComponent } from './components/dashboard/users/users.component';
import { ChartsComponent } from './components/dashboard/charts/charts.component';
import { AboutComponent } from './components/dashboard/about/about.component';
import { HistoriesComponent } from './components/dashboard/histories/histories.component';
import { ControlComponent } from './components/dashboard/control/control.component';
import { HttpClientModule, HttpClientXsrfModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { UserCardComponent } from './components/dashboard/users/user-card/user-card.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    UsersComponent,
    ChartsComponent,
    AboutComponent,
    HistoriesComponent,
    ControlComponent,
    ModalComponent,
    UserCardComponent,
    LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
