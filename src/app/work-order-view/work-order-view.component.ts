import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Customer } from '../interface/customer';
import { PartList } from '../interface/part-list';
import { PartLookUp } from '../interface/part-lookup';
import { Vehicle } from '../interface/vehicle';
import { WorkOrder } from '../interface/work-order';
import { PartListService } from '../services/part-list.service';
import { WorkOrderService } from '../services/work-order.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-work-order-view',
  templateUrl: './work-order-view.component.html',
  styleUrls: ['./work-order-view.component.css']
})
export class WorkOrderViewComponent implements OnInit {

  constructor(
	private route: ActivatedRoute,
	private workOrderService: WorkOrderService,
	private partListService: PartListService,
	private location: Location
	) { }

  workOrder!: WorkOrder;
  customer?: Customer;
  customer_name?: string;
  vehicle?: Vehicle;
  vehicle_descriptor?: string;
  start_date?: string;
  cost?: number;
  description?: string;
  parts?: PartList[];

  ngOnInit(): void {
    this.getParts();
    
  }

  getParts(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.partListService.getParts(id).subscribe(parts => {
      this.parts = parts;
      if (parts.length == 0) {
        console.log("parts array empty");
        this.getWorkOrder(id);
      } else {
        this.setFields(this.parts[0].order);
      }
    });
  }

  getWorkOrder(id: number): void {
    this.workOrderService.getWorkOrder(id).subscribe(order => {
      this.setFields(order);
    });
  }

  setFields(order: WorkOrder): void {
    this.workOrder = order;
    if ( this.workOrder.complete) {
        (<HTMLInputElement>document.getElementById("edit")).disabled = true;
    }
    else {
		(<HTMLInputElement>document.getElementById("edit")).disabled = false;
	}
    this.customer = this.workOrder.vehicleId.customerId;
    this.customer_name = this.customer.firstName + ' ' + this.customer.lastName;
    this.vehicle = this.workOrder.vehicleId;
    this.vehicle_descriptor = this.vehicle.year + ' ' + this.vehicle.make + ' ' + this.vehicle.model;
    this.start_date = this.workOrder.date;
    this.cost = this.workOrder.cost;
    this.description = this.workOrder.description;
  }
  
  goBack(): void {
		this.location.back();
	}
}
