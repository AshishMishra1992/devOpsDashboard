import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndiMetricsComponent } from './indi-metrics/indi-metrics.component';
import { ReleseChartComponent } from './relese-chart/relese-chart.component';

export const routes: Routes = [
    {path:"",component:DashboardComponent},
    {path:"home",component:DashboardComponent},
    {path:"metrics",component:IndiMetricsComponent},
    {path:"releaseChart",component:ReleseChartComponent},
    { path: '**', component: DashboardComponent }

];
