import { Component, OnInit } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import {debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { CustomerService } from '../services/customer.service';
import { Customer } from '../interface/customer';

@Component({
  selector: 'app-customersearch',
  templateUrl: './customersearch.component.html',
  styleUrls: ['./customersearch.component.css']
})
export class CustomersearchComponent implements OnInit {
	customers!: Observable<Customer[]>;
	phones!: Observable<Customer[]>;
	private searchTerms = new Subject<string>();

	constructor(private customerService: CustomerService) {}

	// Push a search term into the observable stream.
	search(term: string): void {
		this.searchTerms.next(term);
	}

	ngOnInit(): void {
		this.phones = this.customerService.getAllCustomer();
    	this.customers = this.searchTerms.pipe(
      		// wait 300ms after each keystroke before considering the term
      		debounceTime(300),

			// ignore new term if same as previous term
			distinctUntilChanged(),

			// switch to new search observable each time the term changes
			switchMap((term: string) => this.searchVehicles(term, this.phones)),
		);
	}
  
	searchVehicles(term: string, customers: Observable<Customer[]>): Observable<Customer[]> {
		if (!term.trim()) {
      		// if not search term, return empty hero array.
      		return of([]);
      	}
		let customerarray: Customer[] = [];
		customers.subscribe(customers => {
			for (let p of customers) {
				if (p.phoneNumber.toString().includes(`${term}`)){
					customerarray.push(p);
				}
		}});
		return of(customerarray);
	}
}



