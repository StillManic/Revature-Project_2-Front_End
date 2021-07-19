import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../services/vehicle.service';
import {Vehicle} from '../interface/vehicle';

@Component({
  selector: 'app-view-vehicles',
  templateUrl: './view-vehicles.component.html',
  styleUrls: ['./view-vehicles.component.css']
})
export class ViewVehiclesComponent implements OnInit {

  constructor(private vehicleService: VehicleService) { }


  ngOnInit(): void {
    this.getAllVehicles();
  
  }

  vehicles: Vehicle[] = [];

  getAllVehicles(): void {
    this.vehicleService.getAllVehicle().subscribe(
      vehicles => this.vehicles = vehicles,
      error => console.log(error)
    );
  }

}
