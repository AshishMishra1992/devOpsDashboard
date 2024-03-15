import { Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IndiMetricsComponent } from './indi-metrics/indi-metrics.component';

export const routes: Routes = [
    {path:"",component:DashboardComponent},
    {path:"metrics",component:IndiMetricsComponent},
    { path: '**', component: DashboardComponent }

];
