import { Component, OnInit } from '@angular/core';
import { WorkOrder } from '../interface/work-order';
import { WorkOrderService } from '../services/work-order.service';
import { CustomerService } from '../services/customer.service';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../interface/vehicle';
import { Customer } from '../interface/customer';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  constructor(private workOrderService: WorkOrderService, private customerService: CustomerService, private vehicleService: VehicleService) { }
  workOrders: WorkOrder[] = [];
  completedWorkOrders: WorkOrder[] = [];
  vehicles: Vehicle[] = [];
  customers: Customer[] = [];
  
  ngOnInit(): void {
    this.getAllWorkOrders()
    this.getAllCustomer()
    this.getAllVehicle()
    this.getCompletedWorkOrders();
  }

  getAllWorkOrders(): void {
    this.workOrderService.getAllWorkOrders().subscribe(
      workOrders => {

        this.workOrders = workOrders
        console.log(this.workOrders)
      }
    )
  }

  getCompletedWorkOrders(): void {
    this.workOrderService.getCompletedWorkOrder().subscribe(
      completedWorkOrders => {
        this.completedWorkOrders = completedWorkOrders
        console.log(this.completedWorkOrders)
      }
    )
  }

  getAllCustomer(): void {
    this.customerService.getAllCustomer().subscribe(
      customers => {
        console.log(customers)
        this.customers = customers
      }
    )
  }

  getAllVehicle(): void {
    this.vehicleService.getAllVehicle().subscribe(
      vehicles => {
        this.vehicles = vehicles
      }
    )
  }
}
