import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { TableComponent } from './table/table.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AppRoutingModule } from './app-routing.module';
import { CardsComponent } from './cards/cards.component';
import { WorkOrderFormComponent } from './work-order-form/work-order-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    TableComponent,
    DashboardComponent,
    CardsComponent,
    WorkOrderFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
