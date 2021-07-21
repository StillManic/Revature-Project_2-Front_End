import { Component, ElementRef, OnInit } from '@angular/core';
import { WorkOrder } from '../interface/work-order';
import { WorkOrderService } from '../services/work-order.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})
export class TableComponent implements OnInit {

  constructor(private workOrderService: WorkOrderService, private route: ActivatedRoute, private elm: ElementRef) {}

  workOrders: WorkOrder[] = [];
  list: string = 'open';

  id: any;
  ngOnInit(): void {
    this.list = this.elm.nativeElement.getAttribute('list');
    
    if (this.list == 'open') {
      this.getOpenWorkOrders();
    } else if (this.list == 'completed') {
      this.getCompltedWorkOrders();
    } else if (this.list == 'all') {
      this.getAllWorkOrders();
    }

    this.id = Number(this.route.snapshot.paramMap.get('id'))
  }

  getAllWorkOrders(): void {
    this.workOrderService.getAllWorkOrders().subscribe(
      workOrders => this.workOrders = workOrders.sort((a, b) => {
        if (a.id != undefined && b.id != undefined) {
          return a.id - b.id;
        }
        return 0;
      }),
      error => console.log(error)
    );
  }

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

  getOpenWorkOrders(): void {
    this.workOrderService.getOpenWorkOrders().subscribe(
      workOrders => this.workOrders = workOrders.sort((a, b) => {
        if (a.id != undefined && b.id != undefined) {
          return a.id - b.id;
        }
        return 0;
      })
    );
  }
}
