import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { WorkOrderService } from '../services/work-order.service';
import { WorkOrder } from '../interface/work-order';

@Component({
  selector: 'app-customerhistory',
  templateUrl: './customerhistory.component.html',
  styleUrls: ['./customerhistory.component.css']
})
export class CustomerhistoryComponent implements OnInit {
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
    const phone = parseInt(this.route.snapshot.paramMap.get('phone')!, 10);
    console.log(phone);
    this.workorderService.getWorkOrderByPhone(phone)
      .subscribe(workorders => this.workorders = workorders);
	for (let wo of this.workorders) {
		if (wo.complete) {
			this.woarray.push(wo);
		}
	}
  }

  goBack(): void {
    this.location.back();
  }

}
