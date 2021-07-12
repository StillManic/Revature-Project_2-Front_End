import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Customer } from '../interface/customer';
import { PartList } from '../interface/part-list';
import { PartLookUp } from '../interface/part-lookup';
import { Vehicle } from '../interface/vehicle';
import { WorkOrder } from '../interface/work-order';
import { WorkOrderService } from '../services/work-order.service';

@Component({
  selector: 'app-work-order-view',
  templateUrl: './work-order-view.component.html',
  styleUrls: ['./work-order-view.component.css']
})
export class WorkOrderViewComponent implements OnInit {

  constructor(private route: ActivatedRoute, private workOrderService: WorkOrderService) { }

  workOrder?: WorkOrder;
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
    this.workOrderService.getParts(id).subscribe(parts => {
      this.parts = parts;
      if (parts.length == 0) {
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
    this.customer = this.workOrder.vehicleId.customerId;
    this.customer_name = this.customer.firstName + ' ' + this.customer.lastName;
    this.vehicle = this.workOrder.vehicleId;
    this.vehicle_descriptor = this.vehicle.year + ' ' + this.vehicle.make + ' ' + this.vehicle.model;
    this.start_date = this.workOrder.date;
    this.cost = this.workOrder.cost;
    this.description = this.workOrder.description;
  }
}
