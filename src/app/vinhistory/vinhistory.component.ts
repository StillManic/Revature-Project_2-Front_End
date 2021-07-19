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
  woarray: WorkOrder[] = [];

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
    console.log(vin);
    this.workorderService.getWorkOrderByVin(vin)
      .subscribe(workorders => this.workorders = workorders);
      console.log(this.workorders)
    for (let wo of this.workorders) {
		if (wo.complete) {
			this.woarray.push(wo);
		}
	}
	console.log(this.woarray)
  }

  goBack(): void {
    this.location.back();
  }

}
