import { Component, OnInit } from '@angular/core';
import { WorkOrder } from '../interface/work-order';
import { WorkorderService } from '../services/workorder.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {

  constructor(private workOrderService: WorkorderService) { }
  workOrders: WorkOrder[] = [];
  ngOnInit(): void {
    this.getAllWorkOrder()
  }

  getAllWorkOrder(): void {
    this.workOrderService.getAllWorkOrder().subscribe(
      workOrders => {

        this.workOrders = workOrders
        console.log(this.workOrders)
      }
    )
  }
}
