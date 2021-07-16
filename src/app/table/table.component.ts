import { Component, OnInit } from '@angular/core';
import { WorkOrder } from '../interface/work-order';
import { WorkOrderService } from '../services/work-order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private workOrderService: WorkOrderService, private route: ActivatedRoute) { }


  workOrders: WorkOrder[] = [];

  id: any;
  ngOnInit(): void {
    this.getAllWorkOrders();
    this.id = Number(this.route.snapshot.paramMap.get('id'))


  }

  getAllWorkOrders(): void {

    this.workOrderService.getAllWorkOrders().subscribe(
      workOrders => {
        let ran = workOrders[0].vehicleId.customerId.firstName;
        console.log(ran)
        this.workOrders = workOrders
        this.workOrders.sort((a: WorkOrder, b: WorkOrder) => {
          let left = a.id ? a.id : -1;
          let right = b.id ? b.id : -1;
          if (left < 0) return 1;
          if (right < 0) return -1;
          return left - right;
        })
      }
    )
  }
}
