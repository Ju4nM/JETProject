import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { LoginComponent } from './components/login/login.component';
import { TodayChartComponent } from './components/today-chart/today-chart.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  { path: "login", component: LoginComponent, canActivate: [LoginGuard]},
  {
    path: "dashboard",
    loadChildren: () => import("./components/dashboard/dashboard.module").then(module => DashboardModule),
    canActivate: [AuthGuard]
  },
  { path: "today-chart", component: TodayChartComponent },
  { path: "**", redirectTo: "login", pathMatch: "full" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
