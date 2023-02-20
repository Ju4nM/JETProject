import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/dashboard/about/about.component';
import { ChartsComponent } from './components/dashboard/charts/charts.component';
import { ControlComponent } from './components/dashboard/control/control.component';
import { UsersComponent } from './components/dashboard/users/users.component';

const routes: Routes = [
  { path: "dashboard/control", component: ControlComponent },
  { path: "dashboard/users", component: UsersComponent },
  { path: "dashboard/about", component: AboutComponent },
  { path: "dashboard", component: AboutComponent },
  { path: "dashboard/charts", component: ChartsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
