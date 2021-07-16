import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { WorkOrderService } from '../services/work-order.service';
import { WorkOrder } from '../interface/work-order';

@Component({
  selector: 'app-vinhistory',
  templateUrl: './vinhistory.component.html',
  styleUrls: ['./vinhistory.component.css']
})
export class VinhistoryComponent implements OnInit {
  workorders: WorkOrder[] = [];

  constructor(
    private route: ActivatedRoute,
    private workorderService: WorkOrderService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getWorkOrders();
  }

  getWorkOrders(): void {
    const vin = parseInt(this.route.snapshot.paramMap.get('vin')!, 10);
    this.workorderService.getWorkOrderByVin(vin)
      .subscribe(workorders => this.workorders = workorders);
  }

  goBack(): void {
    this.location.back();
  }

}
