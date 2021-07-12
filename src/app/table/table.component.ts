import { Component, OnInit } from '@angular/core';
import { WorkOrder } from '../interface/work-order';
import { WorkorderService } from '../services/workorder.service';
@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private workOrderService: WorkorderService) { }

  workOrders: WorkOrder[] = [];

  ngOnInit(): void {
    this.getAllWorkOrder();
  }

  getAllWorkOrder(): void {
    this.workOrderService.getAllWorkOrder().subscribe(
      workOrders => {
        let ran = workOrders[0].vehicleId.customerId.firstName;
        console.log(ran)
        this.workOrders = workOrders
      }
    )
  }
}
