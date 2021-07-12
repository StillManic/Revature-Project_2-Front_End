import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WorkOrder } from '../interface/work-order';
import { Customer } from '../interface/customer';
import { Vehicle } from '../interface/vehicle';
import { PartLookUp } from '../interface/part-lookup'
import { CustomerService } from '../services/customer.service';
import { VehicleService } from '../services/vehicle.service';

@Component({
  selector: 'app-work-order-form',
  templateUrl: './work-order-form.component.html',
  styleUrls: ['./work-order-form.component.css']
})
export class WorkOrderFormComponent implements OnInit {

  constructor(private customerService: CustomerService, private vehicleService: VehicleService) { }

  vehicleId = new FormControl('');
  customer = new FormControl('');
  employeeId = new FormControl('');
  startDate = new FormControl('');
  description = new FormControl('');

  partsSelect = new FormControl('');
  total: number = 0;
  //question mark means undefined at start
  workOrder?: WorkOrder;
  partLookUp?: PartLookUp[];
  customerArray: Customer[] = [];
  vehicleArray: Vehicle[] = [];

  ngOnInit(): void {
    this.getAllCustomers();
  }


  getAllCustomers(): void {
    this.customerService.getAllCustomer().subscribe(customer => {
      this.customerArray = customer;
      console.log(this.customerArray)
    })
  }

  getVehicleByCustomer() {
    let selectedCustomer: number = this.customer.value.split(' ')[0];
    console.log(selectedCustomer)
    this.vehicleService.getVehicleByCustomerId(selectedCustomer).subscribe(
      vehicles => {
        this.vehicleArray = vehicles
        console.log(this.vehicleArray)
      }
    )
  }

  calculateTotal(): void {
    if (this.partsSelect.value.length >= 1) {
      this.total = 0;
      for (let value of this.partsSelect.value) {

        this.total += parseInt(value);
      }
    }
  }

  addWorkOrder(): void {
    // if (!this.vehicleId.value) return;
    // if (!this.customer.value) return;
    // if (!this.employeeId.value) return;
    // if (!this.startDate.value) return;
    // if (!this.description.value) return;

    // this.workOrder = {
    //   vehicleId: this.vehicleId.value,
    //   employeeId: this.employeeId.value,
    //   description: this.description.value,
    //   startDate: this.startDate.value,
    //   cost: this.total
    // }

    // console.log(this.workOrder)
    console.log(this.customer.value.split(' ')[0]) // get ID of customer.
    this.vehicleService.getVehicleByCustomerId(1).subscribe(
      vehicle => console.log(vehicle)
    )
    this.getVehicleByCustomer()

    // this.partLookUp = this.partsSelect.value
    // console.log(this.partLookUp)
    //create function to loop through each part and add it to the database.
  }
}
