import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Customer } from '../interface/customer';
import { PartList } from '../interface/part-list';
import { PartLookUp } from '../interface/part-lookup';
import { Vehicle } from '../interface/vehicle';
import { WorkOrder } from '../interface/work-order';
import { PartListService } from '../services/part-list.service';
import { PartlookupService } from '../services/partlookup.service';
import { WorkOrderService } from '../services/work-order.service';
import { Observable, Subject, of } from 'rxjs';
import {debounceTime, delay, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-work-order-update',
  templateUrl: './work-order-update.component.html',
  styleUrls: ['./work-order-update.component.css']
})
export class WorkOrderUpdateComponent implements OnInit {

  constructor(
    private route: ActivatedRoute, 
    private workOrderService: WorkOrderService, 
    private partListService: PartListService,
    private partlookupService: PartlookupService,
    private location: Location
    ) { }

	workOrder!: WorkOrder;
	partLookUp!: PartLookUp;
	customer?: Customer;
	customer_name?: string;
	vehicle?: Vehicle;
	vehicle_descriptor?: string;
	start_date?: string;
	cost?: number;
	description?: string;
	parts?: PartList[];
	newparts: PartLookUp[] = [];
	searchedparts!: Observable<PartLookUp[]>;
	allparts!: Observable<PartLookUp[]>;
	pl: PartList = {part: this.partLookUp, order: this.workOrder};

	private searchTerms = new Subject<string>();
	
	search(term: string): void {
		this.searchTerms.next(term);
	}

	ngOnInit(): void {
	    this.getParts();
	    this.allparts = this.partlookupService.getAllParts();
	    console.log(this.allparts);
	    this.searchedparts = this.searchTerms.pipe(
      		// wait 300ms after each keystroke before considering the term
      		debounceTime(300),

			// ignore new term if same as previous term
			distinctUntilChanged(),

			// switch to new search observable each time the term changes
			switchMap((term: string) => this.searchParts(term, this.allparts)),
		);
  }

	getParts(): void {
	    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10);
	    this.partListService.getParts(id).subscribe(parts => {
		console.log(parts);
			this.parts = parts;
			if (parts.length == 0) {
				console.log("parts array empty");
				this.getWorkOrder(id);
			} else {
				this.setFields(this.parts[0].order);
			}
		});
	}

	getWorkOrder(id: number): void {
		this.workOrderService.getWorkOrder(id).subscribe(order => {
			this.setFields(order);
		});
	}

  setFields(order: WorkOrder): void {
    this.workOrder = order;
    this.customer = this.workOrder.vehicleId.customerId;
    this.customer_name = this.customer.firstName + ' ' + this.customer.lastName;
    this.vehicle = this.workOrder.vehicleId;
    this.vehicle_descriptor = this.vehicle.year + ' ' + this.vehicle.make + ' ' + this.vehicle.model;
    this.start_date = this.workOrder.date;
    this.cost = this.workOrder.cost;
    this.description = this.workOrder.description;
  }

  searchParts(term: string, parts: Observable<PartLookUp[]>): Observable<PartLookUp[]> {
		if (!term.trim()) {
      		// if not search term, return empty hero array.
      		return of([]);
      	}
		let partarray: PartLookUp[] = [];
		parts.subscribe(parts => {
			for (let p of parts) {
				if (p.name.toString().includes(`${term}`)){
					partarray.push(p);
				}
		}});
		return of(partarray);
	}

	addpart(part: PartLookUp): void {
		this.newparts.push(part);
	}
	
	deletepart(part: PartLookUp): void {
		let i = this.newparts.indexOf(part);
		this.newparts.splice(i, 1);
	}
  
	goBack(): void {
		this.location.back();
	}
	
	save(): void {
		if (this.workOrder) {
			if (this.newparts.length != 0) {
				this.newparts.forEach( (element) => {
					if (this.workOrder) {
						this.pl.order = this.workOrder;
						this.pl.part = element;
						this.partListService.addPartList(this.pl).subscribe();	
					}
				});
				window.location.reload();
			};
			this.workOrder.description = (<HTMLInputElement>document.getElementById("description")).value;
			this.workOrderService.updateWorkOrder(this.workOrder).subscribe(workorder => {
				this.workOrder = workorder;
				});
		}
		console.log(this.workOrder);
	}
	
	reset(): void {
		window.location.reload();
	}
	
	complete(): void {
		if (this.workOrder) {
			this.workOrder.complete = true;
			this.workOrderService.updateWorkOrder(this.workOrder).subscribe(workorder => {
				this.workOrder = workorder;
				});
			setTimeout(() => {this.location.back(); }, 500);
		}
	}
}
