import { Component, OnInit } from '@angular/core';
import { WorkOrder } from '../interface/work-order';
import { WorkOrderService } from '../services/work-order.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  constructor(private workOrderService: WorkOrderService) { }
  workOrders: WorkOrder[] = [];
  completedWorkOrders: WorkOrder[] = [];

  ngOnInit(): void {
    this.getAllWorkOrders()
  }

  getAllWorkOrders(): void {
    this.workOrderService.getAllWorkOrders().subscribe(
      workOrders => {

        this.workOrders = workOrders
        console.log(this.workOrders)
      }
    )
  }

  getCompletedWorkOrders(): void {
    this.workOrderService.getCompletedWorkOrder().subscribe(
      completedWorkOrders => {
        this.completedWorkOrders = completedWorkOrders
      }
    )
  }
}
