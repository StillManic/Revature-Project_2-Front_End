import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TableComponent } from './table/table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { CardsComponent } from './cards/cards.component';
import { WorkOrderFormComponent } from './work-order-form/work-order-form.component';
import { AddCustomerFormComponent } from './add-customer-form/add-customer-form.component';
import { HttpClientModule } from '@angular/common/http';
import { WorkOrderViewComponent } from './work-order-view/work-order-view.component';
import { LoginComponent } from './login/login.component';
import { CookieService } from 'ngx-cookie-service';
import { ViewCustomerComponent } from './view-customer/view-customer.component';
import { AddVehicleComponent } from './add-vehicle/add-vehicle.component';
import { ViewhistoryComponent } from './viewhistory/viewhistory.component';
import { CustomersearchComponent } from './customersearch/customersearch.component';
import { VinsearchComponent } from './vinsearch/vinsearch.component';
import { VinhistoryComponent } from './vinhistory/vinhistory.component';
import { CustomerhistoryComponent } from './customerhistory/customerhistory.component';
import { WorkOrderUpdateComponent } from './work-order-update/work-order-update.component';
import { CustomerTableComponent } from './customer-table/customer-table.component';
import { ViewVehiclesComponent } from './view-vehicles/view-vehicles.component';
import { ViewCompletedWorkorderComponent } from './view-completed-workorder/view-completed-workorder.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TableComponent,
    DashboardComponent,
    CardsComponent,
    WorkOrderFormComponent,
    AddCustomerFormComponent,
    WorkOrderViewComponent,
    ViewCustomerComponent,
    AddVehicleComponent,
    LoginComponent,
    ViewhistoryComponent,
    CustomersearchComponent,
    VinsearchComponent,
    VinhistoryComponent,
    CustomerhistoryComponent,
    WorkOrderUpdateComponent,
    CustomerTableComponent,
    ViewVehiclesComponent,
    ViewCompletedWorkorderComponent

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule

  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
