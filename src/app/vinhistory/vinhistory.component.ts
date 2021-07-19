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
    this.workorderService.getWorkOrderByVin(vin).subscribe(workorders => {
      workorders.sort((a, b) => {
        if (a.id != undefined && b.id != undefined) {
          return a.id - b.id;
        }
        return 0;
      });
      for (let order of workorders) {
        if (order.complete) this.workorders.push(order);
      }
    })
  }


  goBack(): void {
    this.location.back();
  }

}
