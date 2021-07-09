import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { WorkOrder } from '../interface/work-order';
import { PartLookUp } from '../interface/part-lookup'
import { parseSelectorToR3Selector } from '@angular/compiler/src/core';
@Component({
  selector: 'app-work-order-form',
  templateUrl: './work-order-form.component.html',
  styleUrls: ['./work-order-form.component.css']
})
export class WorkOrderFormComponent implements OnInit {

  constructor() { }

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





  ngOnInit(): void {


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
    if (!this.vehicleId.value) return;
    if (!this.customer.value) return;
    if (!this.employeeId.value) return;
    if (!this.startDate.value) return;
    if (!this.description.value) return;

    this.workOrder = {
      vehicleId: this.vehicleId.value,
      employeeId: this.employeeId.value,
      description: this.description.value,
      startDate: this.startDate.value,
      cost: this.total
    }

    console.log(this.workOrder)
    this.partLookUp = this.partsSelect.value
    console.log(this.partLookUp)
    //create function to loop through each part and add it to the database.
  }
}
