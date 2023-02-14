import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MainComponent } from './components/dashboard/main/main.component';
import { UsersComponent } from './components/dashboard/users/users.component';
import { ChartsComponent } from './components/dashboard/charts/charts.component';
import { AboutComponent } from './components/dashboard/about/about.component';
import { HistoriesComponent } from './components/dashboard/histories/histories.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    MainComponent,
    UsersComponent,
    ChartsComponent,
    AboutComponent,
    HistoriesComponent
  ],
  imports: [
    BrowserModule, FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
