import { Component, OnInit } from '@angular/core';
import { WorkOrderService } from '../services/work-order.service';

import { WorkOrder } from '../interface/work-order';

@Component({
  selector: 'app-view-completed-workorder',
  templateUrl: './view-completed-workorder.component.html',
  styleUrls: ['./view-completed-workorder.component.css']
})
export class ViewCompletedWorkorderComponent implements OnInit {

  constructor(private workOrderService: WorkOrderService) { }

  ngOnInit(): void {
    this.getCompltedWorkOrders();
  }

  workOrders: WorkOrder[] = [];

  getCompltedWorkOrders(): void {
    this.workOrderService.getCompletedWorkOrder().subscribe(
      workOrders => this.workOrders = workOrders.sort((a, b) => {
        if (a.id != undefined && b.id != undefined) {
          return a.id - b.id;
        }
        return 0;
      }),
      error => console.log(error)
    );
  }
}
