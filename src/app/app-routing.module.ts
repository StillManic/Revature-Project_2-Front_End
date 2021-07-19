import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { WorkOrderFormComponent } from './work-order-form/work-order-form.component';
import { AddCustomerFormComponent } from './add-customer-form/add-customer-form.component';
import { WorkOrderViewComponent } from './work-order-view/work-order-view.component';

import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { ViewCustomerComponent } from './view-customer/view-customer.component';


import { LoginComponent } from './login/login.component';
import { ViewhistoryComponent } from './viewhistory/viewhistory.component';
import { VinhistoryComponent } from './vinhistory/vinhistory.component';
import { CustomerhistoryComponent } from './customerhistory/customerhistory.component';
import { WorkOrderUpdateComponent } from './work-order-update/work-order-update.component';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { ViewVehiclesComponent } from './view-vehicles/view-vehicles.component';
import { ViewCompletedWorkorderComponent } from './view-completed-workorder/view-completed-workorder.component';


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'workorder', component: WorkOrderFormComponent },
  { path: 'addCustomer', component: AddCustomerFormComponent },
  { path: 'viewOrder/:id', component: WorkOrderViewComponent },

  { path: 'addVehicle', component: AddVehicleComponent },
  { path: 'viewCustomer/:id', component: ViewCustomerComponent },

  { path: '', component: LoginComponent },


  { path: 'viewhistory', component: ViewhistoryComponent },
  { path: 'vin/:vin', component: VinhistoryComponent },
  { path: 'phone/:phone', component: CustomerhistoryComponent },
  { path: 'updateOrder/:id', component: WorkOrderUpdateComponent },
  { path: 'customerTable', component: CustomerTableComponent },
  { path: 'viewVehicle', component: ViewVehiclesComponent },
  { path: 'viewCompleteWorkOrder', component: ViewCompletedWorkorderComponent }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }