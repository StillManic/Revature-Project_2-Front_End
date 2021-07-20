import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Customer } from '../interface/customer';
import { WorkOrder } from '../interface/work-order';
import { CustomerService } from '../services/customer.service';
import { WorkOrderService } from '../services/work-order.service';
import { VehicleService } from '../services/vehicle.service';
import { Vehicle } from '../interface/vehicle';

@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.css']
})
export class ViewCustomerComponent implements OnInit {

  constructor(private route: ActivatedRoute, private customerService: CustomerService, private workOrderService: WorkOrderService, private vehicleService: VehicleService) { }


  id: number = 0;
  customer?: Customer;
  workOrder: WorkOrder[] = [];
  vehicles: Vehicle[] = [];
  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.getCustomerByid();
    this.getWorkOrderByCustomerId();
    this.getVehicleByCustomerId(this.id);
  }

  //crate function to get customer by id
  getCustomerByid(): void {
    this.customerService.getCustomerById(this.id).subscribe(customer => {
      this.customer = customer
      console.log(customer)
    });
  }

  getWorkOrderByCustomerId(): void {
    this.workOrderService.getWorkOrderByCustomerId(this.id).subscribe(workOrder => {
      this.workOrder = workOrder.sort((a, b) => {
        if (a.id != undefined && b.id != undefined) {
          return a.id - b.id;
        }
        return 0;
      })
      console.log(workOrder)
    });
  }

  getVehicleByCustomerId(id: number): void {
    this.vehicleService.getVehicleByCustomerId(id).subscribe(vehicle => {
      this.vehicles = vehicle.sort((a, b) => {
        if (a.id != undefined && b.id != undefined) {
          return a.id - b.id;
        }
        return 0;
      });
    });
  }
}


