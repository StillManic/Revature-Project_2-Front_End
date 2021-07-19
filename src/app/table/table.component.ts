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


  allworkOrders: WorkOrder[] = [];
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
        this.allworkOrders = workOrders
        this.allworkOrders.forEach( (element) => {
					if (element.complete == false) {
						 this.workOrders.push(element)
					}
				});
        this.workOrders.sort((a: WorkOrder, b: WorkOrder) => {
          if (a.id != undefined && b.id != undefined) {
            return a.id - b.id;
          }
          return 0;
        })
      }
    )
  }
}
