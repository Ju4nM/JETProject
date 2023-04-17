import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';
import { AboutComponent } from './about/about.component';
import { ChartsComponent } from './charts/charts.component';
import { ControlComponent } from './control/control.component';
import { DashboardComponent } from './dashboard.component';
import { UsersComponent } from './users/users.component';
import { HistoriesComponent } from './histories/histories.component';

const routes: Routes = [
  {
    path: "",
    component: DashboardComponent,
    children: [
      { path: "control", component: ControlComponent },
      { path: "users", component: UsersComponent, canActivate: [AdminGuard] },
      { path: "about", component: AboutComponent },
      { path: "charts", component: ChartsComponent },
      { path: "history", component: HistoriesComponent, canActivate: [AdminGuard]},
      { path: "**", redirectTo: "about" },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
