import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkOrderFormComponent } from './work-order-form/work-order-form.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'workorder', component: WorkOrderFormComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }