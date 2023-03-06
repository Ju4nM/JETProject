import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './about/about.component';
import { ChartsComponent } from './charts/charts.component';
import { ControlComponent } from './control/control.component';
import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './users/users.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "control", component: ControlComponent },
      { path: "users", component: UsersComponent },
      { path: "about", component: AboutComponent },
      { path: "charts", component: ChartsComponent },
      { path: "**", redirectTo: "users/6405d3bc0506243eeeffbfff" },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
