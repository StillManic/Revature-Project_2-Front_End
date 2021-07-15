import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkOrderFormComponent } from './work-order-form/work-order-form.component';
import { AddCustomerFormComponent } from './add-customer-form/add-customer-form.component';
import { WorkOrderViewComponent } from './work-order-view/work-order-view.component';

import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';

import { LoginComponent } from './login/login.component';
// import { ViewhistoryComponent } from './viewhistory/viewhistory.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'workorder', component: WorkOrderFormComponent },
  { path: 'addCustomer', component: AddCustomerFormComponent },
  { path: 'viewOrder/:id', component: WorkOrderViewComponent },

  { path: 'addVehicle', component: AddVehicleComponent }

  { path: 'login', component: LoginComponent },
  // { path: 'viewhistory', component: ViewhistoryComponent }

  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }