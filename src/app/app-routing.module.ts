import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardModule } from './components/dashboard/dashboard.module';
import { LoginComponent } from './components/login/login.component';
import { TodayChartComponent } from './components/today-chart/today-chart.component';

const routes: Routes = [
  { path: "login", component: LoginComponent},
  { path: "today-chart", component: TodayChartComponent },
  {
    path: "dashboard",
    loadChildren: () => import("./components/dashboard/dashboard.module").then(module => DashboardModule)
  },
  { path: "**", redirectTo: "login" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
