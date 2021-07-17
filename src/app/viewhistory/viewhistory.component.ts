import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
	selector: 'app-viewhistory',
	templateUrl: './viewhistory.component.html',
	styleUrls: ['./viewhistory.component.css']
})
export class ViewhistoryComponent implements OnInit {

	constructor(private location: Location) { }

	ngOnInit(): void {
	}
	
	goBack(): void {
    	this.location.back();
  	}
}